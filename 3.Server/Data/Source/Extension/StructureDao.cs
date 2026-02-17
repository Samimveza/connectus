using Business.Common;
using Business.Dto.Request;
using Business.Dto.Request.Structure;
using Business.Dto.Response;
using Business.Dto.Response.Structure;
using Business.Model;
using Data.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static Business.Enums.Constants;

namespace Data.Source
{
    public partial class StructureDao : GenericRepository<Structure>, IStructureDao
    {
        public BaseListReturnType<StructureListResponse> StructureListRaw(StructureListRequest request)
        {
            var response = new BaseListReturnType<StructureListResponse>
            {
                EntityList = new List<StructureListResponse>()
            };

            var parameters = new[]
            {
                new SqlParameter("@Search", request.Search ?? (object)DBNull.Value),
                new SqlParameter("@IdUser", request.IdUser ?? (object)DBNull.Value),
                new SqlParameter("@IdTenant", request.IdTenant ?? (object)DBNull.Value),
                new SqlParameter("@StructureType", string.IsNullOrEmpty(request.StructureType) ? (object)DBNull.Value : request.StructureType),
                new SqlParameter("@PageSize", request.PageSize),
                new SqlParameter("@PageIndex", request.PageIndex),
                new SqlParameter("@HasGetAllStructuresPermission", request.HasPermission  ? 1 : 0),
                new SqlParameter("@TotalCount", SqlDbType.Int) { Direction = ParameterDirection.Output }
            };

            using (var command = this._dbContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = @"
            EXEC StructureListRaw 
                @IdUser, 
                @Search,
                @IdTenant, 
                @StructureType,
                @PageSize, 
                @PageIndex,
                @HasGetAllStructuresPermission,
                @TotalCount OUTPUT";

                command.Parameters.AddRange(parameters);

                this._dbContext.Database.OpenConnection();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var item = new StructureListResponse
                        {
                            Id = reader.GetString(reader.GetOrdinal("IdStructure")),

                            EntityName = reader.IsDBNull(reader.GetOrdinal("EntityName"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("EntityName")),

                            Headline = reader.IsDBNull(reader.GetOrdinal("Headline"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("Headline")),

                            Email = reader.IsDBNull(reader.GetOrdinal("Email"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("Email")),

                            MainPhoneNumber = reader.IsDBNull(reader.GetOrdinal("MainPhoneNumber"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("MainPhoneNumber")),

                            WorkingOrganisation = reader.IsDBNull(reader.GetOrdinal("WorkingOrganisation"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("WorkingOrganisation")),

                            DateCreated = reader.IsDBNull(reader.GetOrdinal("DateCreated"))
                                ? (DateTime?)null
                                : reader.GetDateTime(reader.GetOrdinal("DateCreated")),

                            IdStructureType = reader.IsDBNull(reader.GetOrdinal("StructureTypeCode"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("StructureTypeCode")),
                        };

                        // Profile picture
                        if (!reader.IsDBNull(reader.GetOrdinal("IdProfilePicture")))
                        {
                            item.ProfilePicture = new DocumentResponse
                            {
                                IdDocument = reader.GetString(reader.GetOrdinal("IdProfilePicture")),
                                Name = reader.IsDBNull(reader.GetOrdinal("ProfilePictureName"))
                                            ? null
                                            : reader.GetString(reader.GetOrdinal("ProfilePictureName")),
                                Url = reader.IsDBNull(reader.GetOrdinal("PictureUrl"))
                                            ? null
                                            : reader.GetString(reader.GetOrdinal("PictureUrl"))
                            };
                        }

                        response.EntityList.Add(item);
                    }
                }
            }

            response.TotalCount = (int)parameters[7].Value; // @TotalCount OUT param
            return response;
        }

        public string GetSlugForStructure(string entityName, string idStructure)
        {
            // Input string parameter
            var inputParam = new SqlParameter("@InputString", entityName)
            {
                SqlDbType = SqlDbType.NVarChar,
                Direction = ParameterDirection.Input
            };

            // Optional structure ID parameter (can be null)
            var idStructureParam = new SqlParameter("@IdStructure", (object?)idStructure ?? DBNull.Value)
            {
                SqlDbType = SqlDbType.NVarChar,
                Direction = ParameterDirection.Input // ✅ Make sure this is INPUT, not OUTPUT
            };

            // Output parameter
            var outputParam = new SqlParameter("@OutputString", SqlDbType.NVarChar, -1)
            {
                Direction = ParameterDirection.Output
            };

            // Execute stored procedure
            _dbContext.Database.ExecuteSqlRaw(
                "EXEC GetSlugForStructure @InputString, @IdStructure, @OutputString OUTPUT",
                inputParam,
                idStructureParam,
                outputParam
            );

            // Return the slug result
            return outputParam.Value as string;
        }

        public string GenerateUniqueSystemSlug()
        {
            // Declare the output parameter
            var outputParam = new SqlParameter("@OutputString", SqlDbType.NVarChar, 5)
            {
                Direction = ParameterDirection.Output
            };

            // Execute the stored procedure
            _dbContext.Database.ExecuteSqlRaw(
                "EXEC GenerateUniqueSystemSlug @OutputString OUTPUT",
                outputParam
            );

            // Return the generated slug
            return outputParam.Value as string;
        }

        public BaseListReturnType<StructureViewResponse> GetStructureViews(GetStructureViewsRequest request)
        {
            BaseListReturnType<StructureViewResponse> response = new BaseListReturnType<StructureViewResponse>
            {
                EntityList = new List<StructureViewResponse>()
            };

            var parameters = new[]
            {
                new SqlParameter("@IdEntityIdentifier", string.IsNullOrEmpty(request.IdStructure) ? (object)DBNull.Value : request.IdStructure),
                new SqlParameter("@OutputType", string.IsNullOrEmpty(request.OutputType) ? (object)DBNull.Value : request.OutputType),
                new SqlParameter("@FilterDate", request.FilterDate)
            };

            using (var command = _dbContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "EXEC GetStructureViews @IdEntityIdentifier, @OutputType, @FilterDate";
                command.Parameters.AddRange(parameters);

                _dbContext.Database.OpenConnection();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var viewResponse = new StructureViewResponse
                        {
                            Date = reader.IsDBNull(reader.GetOrdinal("Date"))
                                ? (DateTime?)null
                                : DateTime.Parse(reader["Date"].ToString()), // handles VARCHAR/FORMAT fallback

                            Source = reader.IsDBNull(reader.GetOrdinal("Source"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("Source")),

                            NoOfViews = reader.IsDBNull(reader.GetOrdinal("NoOfViews"))
                                ? 0
                                : Convert.ToSingle(reader["NoOfViews"])
                        };

                        response.EntityList.Add(viewResponse);
                    }
                }
            }

            return response;
        }

        public List<StructureScanPerViewTypeResponse> GetStructureTotalViews(string idStructure)
        {
            var results = new List<StructureScanPerViewTypeResponse>();

            var parameters = new[]
            {
                new SqlParameter("@IdEntityIdentifier", idStructure)
            };

            using (var command = _dbContext.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = "EXEC GetStructureTotalViews @IdEntityIdentifier";
                command.Parameters.AddRange(parameters);
                _dbContext.Database.OpenConnection();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var item = new StructureScanPerViewTypeResponse
                        {
                            ScanType = reader.IsDBNull(reader.GetOrdinal("Source"))
                                ? null
                                : reader.GetString(reader.GetOrdinal("Source")),

                            NoOfViews = reader.IsDBNull(reader.GetOrdinal("NoOfViews"))
                                ? 0
                                : Convert.ToInt32(reader["NoOfViews"])
                        };

                        results.Add(item);
                    }
                }
            }

            return results;
        }

        public string GetSlugForStructurePortfolio(string portfolioName, string idStructure)
        {
            // Input string parameter
            var inputParam = new SqlParameter("@InputString", portfolioName)
            {
                SqlDbType = SqlDbType.NVarChar,
                Direction = ParameterDirection.Input
            };

            // Optional structure ID parameter (can be null)
            var idStructureParam = new SqlParameter("@IdStructure", (object?)idStructure ?? DBNull.Value)
            {
                SqlDbType = SqlDbType.NVarChar,
                Direction = ParameterDirection.Input // ✅ Make sure this is INPUT, not OUTPUT
            };

            // Output parameter
            var outputParam = new SqlParameter("@OutputString", SqlDbType.NVarChar, -1)
            {
                Direction = ParameterDirection.Output
            };

            // Execute stored procedure
            _dbContext.Database.ExecuteSqlRaw(
                "EXEC GetSlugForStructurePortfolio @InputString, @IdStructure, @OutputString OUTPUT",
                inputParam,
                idStructureParam,
                outputParam
            );

            // Return the slug result
            return outputParam.Value as string;
        }


    }
}
