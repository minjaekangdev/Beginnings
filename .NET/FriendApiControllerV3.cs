using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Friends;
using Sabio.Models.Requests.Friends;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/v3/friends")]
    [ApiController]
    public class FriendApiControllerV3 : BaseApiController
    {
        private IFriendService _service = null; 
        private IAuthenticationService<int> _authService = null;

        public FriendApiControllerV3(IFriendService service, 
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) :base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<FriendV3>> GetAll()
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                List<FriendV3> list = _service.GetAllV3(); 
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
                }
                else
                {
                    response = new ItemsResponse<FriendV3> { Items = list }; 
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
        public ActionResult<FriendV3> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                FriendV3 friend = _service.GetV3(id); 

                if (friend == null )
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<FriendV3> { Item = friend };
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
        public ActionResult<ItemResponse<Paged<FriendV3>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                Paged<FriendV3> page = _service.PaginationV3(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
                }
                else
                {
                    response = new ItemResponse<Paged<FriendV3>> { Item = page };
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
        public ActionResult<ItemResponse<Paged<FriendV3>>> GetSearchPage(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<FriendV3> page = _service.Search_PaginationV3(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<FriendV3>> { Item = page };
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
        public ActionResult<int> Add(FriendAddRequestV3 model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.AddV3(model, userId);
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
        public ActionResult<SuccessResponse> Update(FriendUpdateRequestV3 model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateV3(model);

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
                _service.DeleteV2(id);
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
