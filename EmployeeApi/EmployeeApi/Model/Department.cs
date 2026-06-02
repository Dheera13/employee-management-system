using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace EmployeeApi.Model
{
    [Table("deptartmentTbl")]
    public class Department
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int departmentId { get; set; }
        [Required, MaxLength(50)]
        public string departmentName { get; set; } = string.Empty;
        public bool isActive { get; set; }
    }
}
