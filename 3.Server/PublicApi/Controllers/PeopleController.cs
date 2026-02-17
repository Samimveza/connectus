using Azure;
using Business;
using Business.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PublicApi.Authorization;
using Service;
using Service.Interfaces;
using Swashbuckle.AspNetCore.Annotations;

namespace PublicApi.Controllers
{
    public class PeopleController : Controller
    {
        private IPersonService PersonService { get; }
        public PeopleController(IPersonService personService)
        {
            this.PersonService = personService;
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [SessionRequirement("P1", "P2")]
        [HttpPost("api/get-people")]
        [SwaggerOperation(
            Summary = "Get all people",
            Description = "Get all people",
            OperationId = "people.getAll",
            Tags = new[] { "" })
        ]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople()
        {
            PersonService.GetAllPerson();
            return null;
        }
    }
}
