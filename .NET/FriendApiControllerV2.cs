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
    [Route("api/v2/friends")]
    [ApiController]
    public class FriendApiControllerV2 : BaseApiController
    {
        private IFriendService _service = null;
        private IAuthenticationService<int> _authService = null;

        public FriendApiControllerV2(IFriendService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<FriendV2>> Get(int id)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                FriendV2 aFriend = _service.GetV2(id); 

                if (aFriend == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found"); 
                }
                else
                {
                    response = new ItemResponse<FriendV2> { Item = aFriend }; 
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
        public ActionResult<ItemsResponse<FriendV2>> GetAll()
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                List<FriendV2> list = _service.GetAllV2(); 
                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found"); 
                }
                else
                {
                    response = new ItemsResponse<FriendV2> { Items = list}; 
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
        public ActionResult<ItemResponse<Paged<FriendV2>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<FriendV2> page = _service.PaginationV2(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<FriendV2>> { Item = page };
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
        public ActionResult<ItemResponse<Paged<FriendV2>>> GetSearchPage(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<FriendV2> page = _service.Search_PaginationV2(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<FriendV2>> { Item = page };
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
        public ActionResult<int> AddV2(FriendAddRequestV2 model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.AddV2(model, userId);
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
        public ActionResult<SuccessResponse> Update(FriendUpdateRequestV2 model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateV2(model);

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
        public ActionResult<SuccessResponse> DeleteV2(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteV2(id);

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
