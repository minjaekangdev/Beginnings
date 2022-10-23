using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/friends")]
    [ApiController]
    public class FriendApiController : BaseApiController
    {
        private IFriendService _service = null;
        private IAuthenticationService<int> _authService = null; 

        public FriendApiController(IFriendService service, 
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        } 
        [HttpGet]
        public ActionResult<ItemsResponse<Friend>> GetAll()
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                List<Friend> list = _service.GetAll();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
                }
                else
                {
                    response = new ItemsResponse<Friend> { Items = list };
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

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Friend>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                Friend friend = _service.Get(id);
                
                if (friend == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found."); 
                }
                else
                {
                    response = new ItemResponse<Friend> { Item = friend }; 
                }
            }
            catch(Exception ex)
            {

                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response); 
        }

        [HttpPost]
        public ActionResult<int> Add(FriendAddRequest model)
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
        public ActionResult<SuccessResponse> Update(FriendUpdateRequest model)
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
