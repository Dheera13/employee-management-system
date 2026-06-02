import { Component, inject, signal } from '@angular/core';
import { IEmployeeList } from '../../models/Employeemodel';
import { EmployeeService } from '../../services/employee-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {

  employeeList = signal<IEmployeeList[]>([]);
  empSr=inject(EmployeeService);

  ngOnInit() :void{
    this.getAllEmp()

  }
  getAllEmp(){
    this.empSr.getallEmployee().subscribe( {
      next: (data: IEmployeeList[]) => {
        this.employeeList.set(data);
      }
    });
  }
  onDelete(employeeId:number){
    if(confirm("Are you sure you want to delete this employee?")){
      this.empSr.deleteEmployee(employeeId).subscribe({
        next: (response) => {
          console.log('Employee deleted successfully:', response);
          alert("Employee deleted successfully!");
          this.getAllEmp();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
    }
  }
}
