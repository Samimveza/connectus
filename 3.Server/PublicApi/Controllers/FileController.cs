using Azure;
using Business.Common;
using Business.Dto.Request;
using Business.Dto.Response;
using Business.Dto;
using Business.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PublicApi.Authorization;
using Service.Interfaces;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Net.Http.Headers;

namespace PublicApi.Controllers
{
    public class FileController : Controller
    {
        private readonly Service.Interfaces.IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/upload-file")]
        [SwaggerOperation(
        Summary = "Upload file",
        Description = "Upload file",
        OperationId = "file.uploadfile",
        Tags = new[] { "" })
        ]
        public async Task<ActionResult<BaseResponse<UploadFileResponse>>> UploadFile()
        {
            BaseResponse<UploadFileResponse> response = new BaseResponse<UploadFileResponse>();
            try
            {
                var boundary = HeaderUtilities.RemoveQuotes(MediaTypeHeaderValue.Parse(Request.ContentType).Boundary).Value;

                var reader = new MultipartReader(boundary, Request.Body);

                var section = await reader.ReadNextSectionAsync();

                BusinessResponse<UploadFileResponse> businessResponse = await _fileService.UploadFile(reader, section, false);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;

                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/upload-file-direct")]
        [SwaggerOperation(
        Summary = "Upload file direct",
        Description = "Upload file direct",
        OperationId = "file.uploadfileDirect",
        Tags = new[] { "" })
        ]
        public async Task<ActionResult<BaseResponse<UploadFileResponse>>> UploadFileDirect()
        {
            BaseResponse<UploadFileResponse> response = new BaseResponse<UploadFileResponse>();
            try
            {
                var boundary = HeaderUtilities.RemoveQuotes(MediaTypeHeaderValue.Parse(Request.ContentType).Boundary).Value;

                var reader = new MultipartReader(boundary, Request.Body);

                var section = await reader.ReadNextSectionAsync();

                BusinessResponse<UploadFileResponse> businessResponse = await _fileService.UploadFile(reader, section, true);

                if (businessResponse.HasException())
                {
                    response.Status = RequestStatusEnum.FAILURE;
                    response.ErrorMessage = businessResponse.Exception.Message;

                    return response;
                }

                response.Status = RequestStatusEnum.SUCCESS;
                response.Result = businessResponse.Result;

            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }

            return response;
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpGet("api/get-file/{idFile}")]
        [SwaggerOperation(
        Summary = "Download a file",
        Description = "Download a file",
        OperationId = "file.getFile",
        Tags = new[] { "" })
        ]
        public async Task<IActionResult> GetFile(string idFile)
        {
            try
            {
                BusinessResponse<GetFileResponse> businessResponse = _fileService.GetFile(idFile);

                if (businessResponse.HasException())
                {

                    return StatusCode(500);
                }

                var memory = new MemoryStream();
                await using (var stream = new FileStream(businessResponse.Result.PhysicalPath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                return File(memory, businessResponse.Result.ContentType, businessResponse.Result.FileNameWithExtension);
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
