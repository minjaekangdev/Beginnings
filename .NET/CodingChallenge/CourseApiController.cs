using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Utilities;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.CodingChallenge.Domain;
using Sabio.Models.CodingChallenge.Requests;
using Sabio.Services;
using Sabio.Services.CodingChallenge;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers.CodingChallenge
{
    [Route("api/courses")]
    [ApiController]
    public class CourseApiController : BaseApiController
    {
        private ICourseService _service = null;
        private IAuthenticationService<int> _authService = null; 

        public CourseApiController(ICourseService service, 
            ILogger<PingApiController> logger, 
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<int> Create(CourseAddRequest model)
        {
            int code = 201;
            BaseResponse response = null;

            try
            {
                int id = _service.AddCourse(model);

                if (id != 0)
                {
                    response = new ItemResponse<int> { Item = id }; 
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
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

        [HttpGet("{id:int}")]        
        public ActionResult<Course> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                Course aCourse = _service.GetCourseById(id); 

                if (aCourse == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
                }
                else
                {
                    response = new ItemResponse<Course> { Item = aCourse }; 
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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CourseUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                _service.UpdateCourse(model);

                response = new SuccessResponse();   
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message); 
            }
            return StatusCode(code, response); 
        }

        [HttpDelete("students/{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                _service.DeleteStudent(id);

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

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Course>>> GetByPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null; 

            try
            {
                Paged<Course> page = _service.GetCoursesByPage(pageIndex, pageSize); 

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found."); 
                }
                else
                {
                    response = new ItemResponse<Paged<Course>> { Item = page };
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
