using Business.Common;
using Business.Dto.Request;
using Business.Dto.Request.Structure;
using Business.Dto.Response;
using Business.Dto.Response.Structure;
using Business.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public partial interface IStructureDao : IGenericDao<Structure>
    {
        string GetSlugForStructure(string entityName, string idStruccture);
        string GenerateUniqueSystemSlug();
        BaseListReturnType<StructureViewResponse> GetStructureViews(GetStructureViewsRequest request);
        List<StructureScanPerViewTypeResponse> GetStructureTotalViews(string idStructure);
        string GetSlugForStructurePortfolio(string portfolioName, string idStructure);
        BaseListReturnType<StructureListResponse> StructureListRaw(StructureListRequest request);

        

    }
}
