using Sabio.Models;
using Sabio.Models.CodingChallenge.Domain;
using Sabio.Models.CodingChallenge.Requests;

namespace Sabio.Services.CodingChallenge
{
    public interface ICourseService
    {
        int AddCourse(CourseAddRequest model);
        Course GetCourseById(int id);
        void UpdateCourse(CourseUpdateRequest model);
        void DeleteStudent(int id);
        Paged<Course> GetCoursesByPage(int pageIndex, int pageSize);
    }
}