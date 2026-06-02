using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeApi.Model;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public EmployeeMasterController(EmployeeDbContext context)
        {
            _context = context;
        }

        // ✅ NORMAL GET (ALL)
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var data = await (from emp in _context.Employees
                                  join des in _context.Designations
                                  on emp.designationId equals des.designationId
                                  join dept in _context.Departments
                                  on des.departmentId equals dept.departmentId
                                  select new
                                  {
                                      emp.employeeId,
                                      emp.name,
                                      emp.contact,
                                      emp.email,
                                      emp.city,
                                      emp.state,
                                      emp.pincode,
                                      emp.alternateNbr,
                                      emp.address,
                                      emp.designationId,
                                      designationName = des.designationName,
                                      departmentId = dept.departmentId,
                                      departmentName = dept.departmentName,
                                      emp.role,
                                      emp.createdDate,
                                      emp.modifiedDate
                                  }).ToListAsync();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ GET BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var emp = await _context.Set<Employee>()
                                        .FirstOrDefaultAsync(x => x.employeeId == id);

                if (emp == null)
                    return NotFound("Employee not found");

                return Ok(emp);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ CREATE
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // ✅ UNIQUE CHECK
                var exists = await _context.Set<Employee>()
                    .AnyAsync(x => x.email == model.email || x.contact == model.contact);

                if (exists)
                    return BadRequest("Email or Contact already exists");

                model.createdDate = DateTime.Now;
                model.modifiedDate = DateTime.Now;

                await _context.Set<Employee>().AddAsync(model);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Created successfully", data = model });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee model)
        {
            try
            {
                if (id != model.employeeId)
                    return BadRequest("ID mismatch");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var existing = await _context.Set<Employee>()
                                             .FirstOrDefaultAsync(x => x.employeeId == id);

                if (existing == null)
                    return NotFound("Employee not found");

                // ✅ UNIQUE CHECK (excluding current record)
                var exists = await _context.Set<Employee>()
                    .AnyAsync(x => (x.email == model.email || x.contact == model.contact)
                                   && x.employeeId != id);

                if (exists)
                    return BadRequest("Email or Contact already exists");

                // UPDATE FIELDS
                existing.name = model.name;
                existing.email = model.email;
                existing.contact = model.contact;
                existing.city = model.city;
                existing.state = model.state;
                existing.pincode = model.pincode;
                existing.address = model.address;
                existing.alternateNbr = model.alternateNbr;
                existing.designationId = model.designationId;
                existing.modifiedDate = DateTime.Now;

                _context.Set<Employee>().Update(existing);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ DELETE
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var emp = await _context.Set<Employee>()
                                        .FirstOrDefaultAsync(x => x.employeeId == id);

                if (emp == null)
                    return NotFound("Employee not found");

                _context.Set<Employee>().Remove(emp);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ FILTER + SORT + PAGINATION
        [HttpGet("search")]
        public async Task<IActionResult> Search(
            string? name,
            string? city,
            string? sortBy = "employeeId",
            string? sortOrder = "asc",
            int page = 1,
            int pageSize = 10)
        {
            try
            {
                var query = _context.Set<Employee>().AsQueryable();

                // ✅ FILTER
                if (!string.IsNullOrEmpty(name))
                    query = query.Where(x => x.name.Contains(name));

                if (!string.IsNullOrEmpty(city))
                    query = query.Where(x => x.city.Contains(city));

                // ✅ SORT
                query = sortBy.ToLower() switch
                {
                    "name" => sortOrder == "desc" ? query.OrderByDescending(x => x.name) : query.OrderBy(x => x.name),
                    "city" => sortOrder == "desc" ? query.OrderByDescending(x => x.city) : query.OrderBy(x => x.city),
                    _ => sortOrder == "desc" ? query.OrderByDescending(x => x.employeeId) : query.OrderBy(x => x.employeeId)
                };

                // ✅ PAGINATION
                var totalRecords = await query.CountAsync();

                var data = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Ok(new
                {
                    totalRecords,
                    page,
                    pageSize,
                    data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = await _context.Set<Employee>()
                    .FirstOrDefaultAsync(x => x.email == request.email
                                          && x.contact == request.contactNbr);

                if (user == null)
                    return Unauthorized("Invalid email or password");

                return Ok(new
                {
                    message = "Login successful",
                    data = new
                    {
                        userId = user.employeeId,
                        name = user.name,
                        email = user.email,
                        role = user.role
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}