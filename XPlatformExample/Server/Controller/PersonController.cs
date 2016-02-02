using System;
using System.Net;
using System.Threading;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using XPlatformExample.Server.Hubs;
using XPlatformExample.Server.Models;
using XPlatformExample.Server.Repositories;
using XPlatformExample.Server.Services;

namespace XPlatformExample.Server.Controller
{
    //[System.Web.Http.Authorize]
    [RoutePrefix("api/person")]
    public class PersonController : ApiController
    {
        private readonly Random _random = new Random();
        private readonly IHubContext _personHubContext;
        private readonly IHubContext _valueHubContext;
        private readonly IPersonRepository _personRepository;

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
            _personHubContext = GlobalHost.ConnectionManager.GetHubContext<PersonHub>();
            _valueHubContext = GlobalHost.ConnectionManager.GetHubContext<ValueHub>();

            CreateTimer();
        }

        public IHttpActionResult Get()
        {
            try
            {
                return Ok(_personRepository.GetAll());
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult GetSingle(int id)
        {
            try
            {
                Person person = _personRepository.GetSingle(id);

                if (person == null)
                {
                    return NotFound();
                }

                return Ok(person);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpPost]
        public IHttpActionResult AddPerson([FromBody] Person person)
        {
            try
            {
                if (person == null)
                {
                    return BadRequest();
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                Person addedPerson = _personRepository.AddPerson(person);

                _personHubContext.Clients.All.personAdded(addedPerson);

                return Ok(addedPerson);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult DeletePerson(int id)
        {
            try
            {
                Person personToRemove = _personRepository.GetSingle(id);

                if (personToRemove == null)
                {
                    return NotFound();
                }

                _personRepository.DeletePerson(id);

                _personHubContext.Clients.All.personDeleted(personToRemove);

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        private void CreateTimer()
        {
            if (Singleton.Instance.Timer == null)
            {
                Singleton.Instance.Timer = new Timer(OnTimerElapsed, null, 3000, 1500);
            }
        }

        private void OnTimerElapsed(object sender)
        {
            var cpuValue = _random.Next(0, 100);
            _valueHubContext.Clients.All.newCpuValue(cpuValue);
        }
    }
}