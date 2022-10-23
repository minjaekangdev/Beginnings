using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Addresses;
using Sabio.Models.Requests.Addresses;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/addresses")]
    [ApiController]
    public class AddressApiController : BaseApiController
    {
        private IAddressService _service = null;
        private IAuthenticationService<int> _authService = null;
        public AddressApiController(IAddressService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        // GETALL api/addresses
        [HttpGet("")] // or [HttpGet] to look prettier
        public ActionResult<ItemsResponse<Address>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;


            try
            {
                List<Address> list = _service.GetRandomAddresses();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Address> { Items = list };
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


        //GET BY ID
        // api/widgets/{id:int}
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Address>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;


            try
            {
                Address address = _service.Get(id);

                if (address == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Address> { Item = address };
                }
            }
            catch (SqlException sqlEx)
            {
                iCode = 500;
                return base.StatusCode(500, new ErrorResponse($"Generic Error: {sqlEx.Message}"));
            }
            catch (ArgumentException argEx)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {argEx.Message}");

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }


        //ADD
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(AddressAddRequest model)
        {
            //id of the new address
            int userId = _authService.GetCurrentUserId();
            int id = _service.Add(model, userId);

            ItemResponse<int> response = new ItemResponse<int>();

            response.Item = id;

            return StatusCode(201, response);
        }


        //UPDATE
        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(AddressUpdateRequest model)
        {
            //id of the new address
            _service.Update(model);

            SuccessResponse response = new SuccessResponse();

            return Ok(response);
        }

        //DELETE
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
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
    }
}
