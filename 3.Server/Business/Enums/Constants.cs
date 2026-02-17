using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Enums
{
    public static class Constants
    {
        public static class RolesConstant
        {
            public const string ADMINISTRATORS = "ADMINISTRATOR";
            public const string NORMAL = "NORMAL";
            public const string APPROVER = "APPROVER";
        }

        public static class PermissionsConstant
        {
            public const string GET_ALL_STRUCTURES = "GET_ALL_STRUCTURES";
            public const string CREATE_GENERIC = "CREATE_GENERIC";
            public const string GET_ALL_BENEFICIARIES = "GET_ALL_BENEFICIARIES";
            public const string GET_ALL_STRUCTURE_BLOCKCHAIN_ASSETS = "GET_ALL_STRUCTURE_BLOCKCHAIN_ASSETS";
            public const string GET_ALL_TRANSACTIONS = "GET_ALL_TRANSACTIONS";

            public const string APPROVE_ONBOARDING = "APPROVE_ONBOARDING";
            public const string REJECT_ONBOARDING = "REJECT_ONBOARDING";
            public const string APPROVE_WALLET = "APPROVE_WALLET";
            public const string REJECT_WALLET = "REJECT_WALLET";
            public const string APPROVE_TRANSACTION = "APPROVE_TRANSACTION";
            public const string REJECT_TRANSACTION = "REJECT_TRANSACTION";
            public const string WITHDRAW_WALLET = "WITHDRAW_WALLET";
            
        }

        public static class ApplicationConstant
        {
            public const string PERMISSIONS = "PERMISSIONS";
            public const string PERMISSIONS_ID = "PERMISSIONS_ID";
            public const string IDUSER = "IDUSER";
            public const string IDTENANT = "IDTENANT";
            public const string ROLES = "ROLES";
            public const string ROLES_ID = "ROLES_ID";
            public const string DOMAIN = "domain";
        }

        public static class StructureTypeConstant
        {
            public const string LEGAL_ENTITY = "LEGAL_ENTITY";
            public const string INDIVIDUAL = "INDIVIDUAL";
        }

        public static class ParameterConstant
        {
            public const string DOCUMENT_PHYSICAL_FILE_PATH = "PHYSICAL_FILE_PATH";
            public const string DOCUMENT_SERVER_FILE_PATH = "DOCUMENT_SERVER_FILE_PATH";
            public const string DOCUMENT_SERVER_DIRECT_FILE_PATH = "DOCUMENT_SERVER_DIRECT_FILE_PATH";

            public const string EMAIL_VERIFICATION_TEMPLATE = "EMAIL_VERIFICATION_TEMPLATE";
            public const string EMAIL_VERIFICATION_TEMPLATE_SUBJECT = "EMAIL_VERIFICATION_TEMPLATE_SUBJECT";

            public const string EMAIL_OTP_VERIFICATION_TEMPLATE = "EMAIL_OTP_VERIFICATION_TEMPLATE";
            public const string EMAIL_OTP_VERIFICATION_TEMPLATE_SUBJECT = "EMAIL_OTP_VERIFICATION_TEMPLATE_SUBJECT";

            public const string INDIVIDUAL_BASE_SLUG_URL = "INDIVIDUAL_BASE_SLUG_URL";
            public const string COMPANY_BASE_SLUG_URL = "COMPANY_BASE_SLUG_URL";

            public const string FORGOT_PASSWORD_OTP_TEMPLATE = "FORGOT_PASSWORD_OTP_TEMPLATE";
            public const string FORGOT_PASSWORD_OTP_SUBJECT = "FORGOT_PASSWORD_OTP_SUBJECT";

            public const string INDIVIDUAL_PROFILE_COLOUR_VARIANTS = "INDIVIDUAL_PROFILE_COLOUR_VARIANTS";
            public const string COMPANY_PROFILE_COLOUR_VARIANTS = "COMPANY_PROFILE_COLOUR_VARIANTS";


            

            public static string ToConstant(string idParameter)
            {
                switch (idParameter)
                {
                    case "da03b3c4-9d76-4a4e-982b-d9ba3bd51e7d": return ParameterConstant.DOCUMENT_PHYSICAL_FILE_PATH;
                    case "7a36bfc3-50b8-4501-b16b-809ea2c182e6": return ParameterConstant.DOCUMENT_SERVER_FILE_PATH;
                    case "59119059-dd24-4444-9f72-fd065b1d11d1": return ParameterConstant.DOCUMENT_SERVER_DIRECT_FILE_PATH;

                    case "ef4432d9-9e46-4d9b-a633-a3944bad372b": return ParameterConstant.EMAIL_VERIFICATION_TEMPLATE;
                    case "4b30d43e-61d9-42d3-a569-883e4fa2a797": return ParameterConstant.EMAIL_VERIFICATION_TEMPLATE_SUBJECT;

                    case "cc12d16c-5132-4364-b1ca-7619a1c68987": return ParameterConstant.EMAIL_OTP_VERIFICATION_TEMPLATE;
                    case "25056fde-d016-4892-8d27-4be248cbc1cc": return ParameterConstant.EMAIL_OTP_VERIFICATION_TEMPLATE_SUBJECT;

                    case "1682972f-7b28-4b00-8e78-bdec70917ffb": return ParameterConstant.INDIVIDUAL_BASE_SLUG_URL;
                    case "670beea1-7243-4734-adf6-4eaab094d78b": return ParameterConstant.COMPANY_BASE_SLUG_URL;


                    case "093f115b-78b1-4b19-a3af-1915aac9246f": return ParameterConstant.FORGOT_PASSWORD_OTP_TEMPLATE;
                    case "3c4836ab-76a4-426a-956b-d45e15bd5b5b": return ParameterConstant.FORGOT_PASSWORD_OTP_SUBJECT;

                    case "dd82794c-119f-4484-852e-570e15676695": return ParameterConstant.INDIVIDUAL_PROFILE_COLOUR_VARIANTS;
                    case "a730e703-7982-4e61-84a3-72f4f9ab7469": return ParameterConstant.COMPANY_PROFILE_COLOUR_VARIANTS;
                        

                    default: return null;
                }
            }

            public static string FromConstant(string parameterConstant)
            {
                switch (parameterConstant)
                {
                    case ParameterConstant.DOCUMENT_SERVER_FILE_PATH: return "7a36bfc3-50b8-4501-b16b-809ea2c182e6";
                    case ParameterConstant.DOCUMENT_PHYSICAL_FILE_PATH: return "da03b3c4-9d76-4a4e-982b-d9ba3bd51e7d";
                    case ParameterConstant.DOCUMENT_SERVER_DIRECT_FILE_PATH: return "59119059-dd24-4444-9f72-fd065b1d11d1";
                        
                    case ParameterConstant.EMAIL_VERIFICATION_TEMPLATE: return "ef4432d9-9e46-4d9b-a633-a3944bad372b";
                    case ParameterConstant.EMAIL_VERIFICATION_TEMPLATE_SUBJECT: return "4b30d43e-61d9-42d3-a569-883e4fa2a797";

                    case ParameterConstant.INDIVIDUAL_BASE_SLUG_URL: return "1682972f-7b28-4b00-8e78-bdec70917ffb";
                    case ParameterConstant.COMPANY_BASE_SLUG_URL: return "670beea1-7243-4734-adf6-4eaab094d78b";

                    case ParameterConstant.FORGOT_PASSWORD_OTP_TEMPLATE: return "093f115b-78b1-4b19-a3af-1915aac9246f";
                    case ParameterConstant.FORGOT_PASSWORD_OTP_SUBJECT: return "3c4836ab-76a4-426a-956b-d45e15bd5b5b";

                    case ParameterConstant.INDIVIDUAL_PROFILE_COLOUR_VARIANTS: return "dd82794c-119f-4484-852e-570e15676695";
                    case ParameterConstant.COMPANY_PROFILE_COLOUR_VARIANTS: return "a730e703-7982-4e61-84a3-72f4f9ab7469";


                    default: return null;
                }
            }
        }

        public static class IntegrationStateConstant
        {
            public const string INITIALIZATION_SUCCESS = "1ef7c6e0-9d92-46bd-945a-24ecc98bcd0e";
            public const string PENDING_INITIALIZATION = "519344d6-4405-4c22-ba24-2637e6f1148c";
            public const string INITIALIZATION_FAILURE = "877021df-ef89-411b-b7db-63f88193a859";

            public static string ToConstant(string idIntegrationState)
            {
                switch (idIntegrationState)
                {
                    case INITIALIZATION_SUCCESS: return "INITIALIZATION_SUCCESS";
                    case PENDING_INITIALIZATION: return "PENDING_INITIALIZATION";
                    case INITIALIZATION_FAILURE: return "INITIALIZATION_FAILURE";
                    default: return null;
                }
            }

            public static string FromConstant(string integrationStateConstant)
            {
                switch (integrationStateConstant)
                {
                    case "INITIALIZATION_SUCCESS": return INITIALIZATION_SUCCESS;
                    case "PENDING_INITIALIZATION": return PENDING_INITIALIZATION;
                    case "INITIALIZATION_FAILURE": return INITIALIZATION_FAILURE;
                    default: return null;
                }
            }
        }

        public static class IntegrationDetailActionTypeConstant
        {
            public const string DOWNLOAD_FILE = "6226cf21-2511-4c16-a7ac-7f790d242465";
            public const string OPEN_URL = "a639a43a-6f0a-4fca-a06b-8ae15c4bd386";
            public const string OPEN_FRAME = "bb071d56-a19d-48ef-b8f8-1c6f5747f404";

            public static string ToConstant(string idIntegrationDetailActionType)
            {
                switch (idIntegrationDetailActionType)
                {
                    case DOWNLOAD_FILE: return "DOWNLOAD_FILE";
                    case OPEN_URL: return "OPEN_URL";
                    case OPEN_FRAME: return "OPEN_FRAME";
                    default: return null;
                }
            }

            public static string FromConstant(string integrationDetailActionTypeConstant)
            {
                switch (integrationDetailActionTypeConstant)
                {
                    case "DOWNLOAD_FILE": return DOWNLOAD_FILE;
                    case "OPEN_URL": return OPEN_URL;
                    case "OPEN_FRAME": return OPEN_FRAME;
                    default: return null;
                }
            }
        }

        public static class IntegrationTypeConstant
        {
            public const string CELERO = "5e2851c8-8a25-4b11-9527-7c0ff979ed47";

            public static string ToConstant(string idIntegrationType)
            {
                switch (idIntegrationType)
                {
                    case CELERO: return "CELERO";
                    default: return null;
                }
            }

            public static string FromConstant(string integrationTypeConstant)
            {
                switch (integrationTypeConstant)
                {
                    case "CELERO": return CELERO;
                    default: return null;
                }
            }
        }

    }
}
