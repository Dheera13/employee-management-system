using EmployeeApi.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public DesignationMasterController(EmployeeDbContext context)
        {
            _context = context;
        }

        // ✅ GET ALL
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var data = (from d in _context.Designations
                            join dept in _context.Departments
                            on d.departmentId equals dept.departmentId
                            select new
                            {
                                d.designationId,
                                d.designationName,
                                d.departmentId,
                                departmentName = dept.departmentName
                            }).ToList();
                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        // ✅ GET BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var data = await _context.Set<Designation>()
                                         .FirstOrDefaultAsync(x => x.designationId == id);

                if (data == null)
                    return NotFound("Record not found");

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ CREATE
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] Designation model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _context.Set<Designation>().AddAsync(model);
                await _context.SaveChangesAsync();

                return Ok(model);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ UPDATE
        [HttpPut("Update")]
        public async Task<IActionResult> Update(int id, [FromBody] Designation model)
        {
            try
            {
                if (id != model.designationId)
                    return BadRequest("ID mismatch");

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var existing = await _context.Set<Designation>()
                                             .FirstOrDefaultAsync(x => x.designationId == id);

                if (existing == null)
                    return NotFound("Record not found");

                // Update fields
                existing.departmentId = model.departmentId;
                existing.designationName = model.designationName;

                await _context.SaveChangesAsync();

                return Ok(existing);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ DELETE
        [Authorize(Roles = "Admin")]
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var data = await _context.Set<Designation>()
                                         .FirstOrDefaultAsync(x => x.designationId == id);

                if (data == null)
                    return NotFound("Record not found");

                _context.Set<Designation>().Remove(data);
                await _context.SaveChangesAsync();

                return Ok("Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // ✅ FILTER API (by departmentId or name)
        [HttpGet("filter")]
        public async Task<IActionResult> Filter(int? departmentId, string? name)
        {
            try
            {
                var query = _context.Set<Designation>().AsQueryable();

                if (departmentId.HasValue)
                    query = query.Where(x => x.departmentId == departmentId.Value);

                if (!string.IsNullOrEmpty(name))
                    query = query.Where(x => x.designationName.Contains(name));

                var result = await query.ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}

