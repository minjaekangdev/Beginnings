using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Addresses;
using Sabio.Models.Requests.Users;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController
    {
        private IUserServiceV1 _service = null;
        private IAuthenticationService<int> _authService = null;

        public UserApiController(IUserServiceV1 service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<User>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {

                List<User> list = _service.GetAll();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<User> { Items = list };
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
        public ActionResult<ItemResponse<User>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                User user = _service.Get(id);

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<User> { Item = user };
                }
            }
            catch (SqlException sqlEx)
            {
                code = 500;
                return base.StatusCode(500, new ErrorResponse($"Generic Error: {sqlEx.Message}"));
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error: {argEx.Message}");

            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpPost]
        public ActionResult<int> Create(UserAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;
            try
            {
                int id = _service.Add(model);

                if (id != 0)
                {
                    response = new ItemResponse<int> { Item = id };
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }

            }
            catch (SqlException sqlEx)
            {
                code = 500;
                return base.StatusCode(500, new ErrorResponse($"Generic Error: {sqlEx.Message}"));
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error: {argEx.Message}");

            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(UserUpdateRequest model)
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
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
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
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response); 
        }
    }

}
