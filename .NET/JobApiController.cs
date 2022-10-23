using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Jobs;
using Sabio.Models.Domain.TechCos;
using Sabio.Models.Requests.Jobs;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/job")]
    [ApiController]
    public class JobApiController : BaseApiController
    {
        private IJobService _service = null;
        private IAuthenticationService<int> _authService = null; 

        public JobApiController(IJobService service, 
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }   
        [HttpGet("{id:int}")]
        public ActionResult<Job> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                Job aJob = _service.Get(id);

                if (aJob == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
                }
                else
                {
                    response = new ItemResponse<Job> { Item = aJob }; 
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response); 
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Job>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                Paged<Job> page = _service.Pagination(pageIndex, pageSize); 

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Job>> { Item = page };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString()); 
            }
            return StatusCode(code, response); 
        }

        [HttpPost]
        public ActionResult<int> Add(JobAddRequest model)
        {
            ObjectResult result = null; 

            try
            {
                int userId = _authService.GetCurrentUser().Id;

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
        public ActionResult<SuccessResponse> Update(JobUpdateRequest model)
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
        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Job>>> GetSearchPage(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Job> page = _service.Search_Pagination(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Job>> { Item = page };
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
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response); 
        }
    }
}
