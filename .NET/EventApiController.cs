using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models.Domain.Jobs;
using Sabio.Models;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Domain.Events;
using Sabio.Models.Requests.Events;
using Sabio.Models.Requests.Jobs;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/event")]
    [ApiController]
    public class EventApiController : BaseApiController
    {
        private IEventService _service = null;
        private IAuthenticationService<int> _authService = null;

        public EventApiController(IEventService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Event>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> page = _service.Pagination(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Event>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<int> Add(EventAddRequest model)
        {
            ObjectResult result = null; 

            try
            {
                int userId = _authService.GetCurrentUserId(); 

                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result; 
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(EventUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("search/geo")]
        public ActionResult<ItemsResponse<Event>> SearchGeo(double latitude, double longitude, double radius)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                List<Event> list = _service.Search_Geo(latitude, longitude, radius);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Event> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response); 
        }
    }
}
