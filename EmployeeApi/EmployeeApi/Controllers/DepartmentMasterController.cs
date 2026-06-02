using EmployeeApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        public DepartmentMasterController(EmployeeDbContext context)
        {
            _context = context;
        }
        [HttpGet("GetAllDepartment")]
        public IActionResult GetAllDepartment()
        {
            var deptList = _context.Departments.ToList();
            return Ok(deptList);

        }
        [HttpPost("AddDepartment")]
        public IActionResult AddDepartment(Department dept)
        {
            if (dept == null || string.IsNullOrWhiteSpace(dept.departmentName))
                return BadRequest("Department name is required.");

            var name = dept.departmentName.Trim();

            // case-insensitive check (translated to SQL)
            var exists = _context.Departments
                .Any(d => d.departmentName.ToLower() == name.ToLower());

            if (exists)
                return Conflict("A department with the same name already exists.");

            dept.departmentName = name;
            _context.Departments.Add(dept);
            _context.SaveChanges();
            return Created("Department Added Successfully",dept);
        }
        [HttpPut("UpdateDepartment")]
        public IActionResult UpdateDepartment(Department dept)
        {
            var deptData = _context.Departments.Where(x => x.departmentId == dept.departmentId).FirstOrDefault();
            if (deptData != null)
            {
                deptData.departmentName = dept.departmentName;
                deptData.isActive = dept.isActive;
                _context.SaveChanges();
                return Created("Department Updated Successfully",dept);
            }
            else
            {
                return NotFound("Department Not Found");
            }
        }
        [HttpDelete("DeleteDepartment")]
        public IActionResult DeleteDepartment(int id)
        {
            var deptData = _context.Departments.Where(x => x.departmentId == id).FirstOrDefault();
            if (deptData != null)
            {
                _context.Departments.Remove(deptData);
                _context.SaveChanges();
                return Created("Department Deleted Successfully",id);
            }
            else
            {
                return NotFound("Department Not Found");
            }
        }
    }
}
