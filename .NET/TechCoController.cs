using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Domain.TechCos;
using Sabio.Models.Requests.Friends;
using Sabio.Models.Requests.TechCos;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/techco")]
    [ApiController]
    public class TechCoController : BaseApiController
    {
        private ITechCoService _service = null;
        private IAuthenticationService<int> _authService = null; 

        public TechCoController(ITechCoService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService; 
        }
        [HttpGet("{id:int}")]
        public ActionResult<TechCo> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                TechCo techCo = _service.Get(id); 
                
                if (techCo == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<TechCo> { Item = techCo }; 
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
        [HttpGet]
        public ActionResult<ItemsResponse<TechCo>> GetAll()
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                List<TechCo> list = _service.GetAll(); 

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
                }
                else
                {
                    response = new ItemsResponse<TechCo> { Items = list }; 
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
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<TechCo>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                Paged<TechCo> page = _service.Pagination(pageIndex, pageSize); 

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
                }
                else
                {
                    response = new ItemResponse<Paged<TechCo>> { Item = page };
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
        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<TechCo>>> GetSearchPage(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<TechCo> page = _service.Search_Pagination(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<TechCo>> { Item = page };
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
        public ActionResult<int> Add(TechCoAddRequest model)
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
        public ActionResult<SuccessResponse> Update(TechCoUpdateRequest model)
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
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}
