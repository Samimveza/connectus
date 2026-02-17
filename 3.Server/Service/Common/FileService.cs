using Azure.Core;
using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Data.Interfaces;
using Microsoft.AspNetCore.WebUtilities;
using Service.Interfaces;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;
using Business.Model;
using System.Security.Policy;
using Microsoft.AspNetCore.StaticFiles;

namespace Service.Common;

public class FileService : Service.Interfaces.IFileService
{
    public IUnitOfWork _unitOfWork;
    private readonly IGlobalDataService _globalDataService;

    public FileService(
         IUnitOfWork unitOfWork,
          IGlobalDataService globalDataService
        )
    {
        _unitOfWork = unitOfWork;
        _globalDataService = globalDataService;
    }


    public async Task<BusinessResponse<UploadFileResponse>> UploadFile(MultipartReader reader, MultipartSection? section, bool isDirect = false)
    {

        BusinessResponse<UploadFileResponse> response = new BusinessResponse<UploadFileResponse>();
        try
        {
            response.Result = await UploadFileRaw(reader, section, isDirect);
        }
        catch (Exception ex)
        {
            response.Exception = new BusinessLayerException(ex.Message, ex);
        }

        return response;
    }


    public async Task<UploadFileResponse> UploadFileRaw(MultipartReader reader, MultipartSection? section, bool isDirect = false)
    {
        var idUser = _globalDataService.GetVariable<string>(ApplicationConstant.IDUSER);
        var idTenant = _globalDataService.GetVariable<string>(ApplicationConstant.IDTENANT);

        UploadFileResponse uploadFileResponse = new UploadFileResponse();

        Parameter physicalFilePath = _unitOfWork.ParameterDao.GetCustom(p => p.IdParameter == ParameterConstant.FromConstant(ParameterConstant.DOCUMENT_PHYSICAL_FILE_PATH));
        Parameter serverFilePath = _unitOfWork.ParameterDao.GetCustom(p => p.IdParameter == ParameterConstant.FromConstant(ParameterConstant.DOCUMENT_SERVER_FILE_PATH));
        Parameter directServerFilePath = _unitOfWork.ParameterDao.GetCustom(p => p.IdParameter == ParameterConstant.FromConstant(ParameterConstant.DOCUMENT_SERVER_DIRECT_FILE_PATH));

        string originalFileName = null;
        string originalFileNameWithoutExtension = null;
        string fileExtension = null;
        string storageFileNameWithExtension = null;

        while (section != null)
        {
            var hasContentDispositionHeader = ContentDispositionHeaderValue.TryParse(
                section.ContentDisposition, out var contentDisposition
            );
            if (hasContentDispositionHeader)
            {
                if (contentDisposition.DispositionType.Equals("form-data") &&
                (!string.IsNullOrEmpty(contentDisposition.FileName.Value) ||
                !string.IsNullOrEmpty(contentDisposition.FileNameStar.Value)))
                {
                    originalFileName = contentDisposition.FileName.Value;
                    originalFileNameWithoutExtension = Path.GetFileNameWithoutExtension(originalFileName);

                    var invalidFileNameCharacters = System.IO.Path.GetInvalidFileNameChars();
                    originalFileNameWithoutExtension = String.Join("_", originalFileNameWithoutExtension.Split(invalidFileNameCharacters, StringSplitOptions.RemoveEmptyEntries)).TrimEnd('.');

                    fileExtension = Path.GetExtension(contentDisposition.FileName.Value).Replace(".", "");
                    storageFileNameWithExtension = string.Format("{0}.{1}", Guid.NewGuid().ToString(), fileExtension);

                    string filePath = Path.GetFullPath(Path.Combine(physicalFilePath.ParamaterValue, "UploadedFiles"));

                    byte[] fileArray;
                    using (var memoryStream = new MemoryStream())
                    {
                        await section.Body.CopyToAsync(memoryStream);
                        fileArray = memoryStream.ToArray();
                    }
                    using (var fileStream = System.IO.File.Create(Path.Combine(filePath, storageFileNameWithExtension)))
                    {
                        await fileStream.WriteAsync(fileArray);
                    }
                }
            }
            section = await reader.ReadNextSectionAsync();
        }

        Document document = new Document()
        {
            FileExtension = fileExtension,
            FileName = originalFileNameWithoutExtension,
            IdParameterBasePhysicalFilePath = physicalFilePath.IdParameter,
            IdParameterBaseServerUrl = isDirect ? directServerFilePath.IdParameter : serverFilePath.IdParameter,

            PhysicalFilePath = Path.Combine("UploadedFiles", storageFileNameWithExtension),
        };

        document.ServerFilePath = isDirect ? Path.Combine("UploadedFiles", storageFileNameWithExtension) : document.IdDocument;


        _unitOfWork.DocumentDao.Add(document);
        _unitOfWork.Save();

        uploadFileResponse.IdDocument = document.IdDocument;
        uploadFileResponse.Name = originalFileNameWithoutExtension;
        uploadFileResponse.Url = String.Format("{0}/{1}", isDirect ? directServerFilePath.ParamaterValue : serverFilePath.ParamaterValue, isDirect ? document.PhysicalFilePath : document.IdDocument);

        return uploadFileResponse;
    }


    public BusinessResponse<GetFileResponse> GetFile(string idDocument)
    {

        BusinessResponse<GetFileResponse> response = new BusinessResponse<GetFileResponse>();
        try
        {
            response.Result = GetFileRaw(idDocument);
        }
        catch (Exception ex)
        {
            response.Exception = new BusinessLayerException(ex.Message, ex);
        }

        return response;
    }

    public GetFileResponse GetFileRaw(string idDocument)
    {
        GetFileResponse uploadFileResponse = new GetFileResponse();
        var document = _unitOfWork.DocumentDao.GetCustom(d => d.IdDocument == idDocument, new List<string>() {
            "IdParameterBasePhysicalFilePathNavigation"
        });

        if (document == null)
            throw new Exception("File not found");

        string filePath = Path.Combine(document.IdParameterBasePhysicalFilePathNavigation.ParamaterValue, document.PhysicalFilePath);

        if (!System.IO.File.Exists(filePath))
            throw new Exception("File not found");

        uploadFileResponse.ContentType = GetContentType(filePath);
        uploadFileResponse.FileNameWithExtension = string.Format("{0}.{1}", document.FileName, document.FileExtension);
        uploadFileResponse.PhysicalPath = filePath;

        return uploadFileResponse;
    }

    private string GetContentType(string path)
    {
        var provider = new FileExtensionContentTypeProvider();
        string contentType;

        if (!provider.TryGetContentType(path, out contentType))
        {
            contentType = "application/octet-stream";
        }

        return contentType;
    }



}
