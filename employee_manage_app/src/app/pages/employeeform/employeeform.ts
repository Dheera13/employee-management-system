import { Component ,inject,signal} from '@angular/core';
import { Employeemodel } from '../../models/Employeemodel';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { DesignationListmodel } from '../../models/Designation.model';
import { Observable } from 'rxjs';
import { Master } from '../../services/master';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employeeform',
  imports: [FormsModule, CommonModule, AsyncPipe],
  templateUrl: './employeeform.html',
  styleUrl: './employeeform.css',
})
export class Employeeform {
  newEmployeeObj:Employeemodel = new Employeemodel();
  empservice= inject(EmployeeService);
  $designationList :Observable<DesignationListmodel[]>= new Observable<DesignationListmodel[]>();
  masterServ=inject(Master);
  activeRoute = inject(ActivatedRoute);


  constructor(){
    this.activeRoute.params.subscribe((res:any) => {
      const  employeeId = Number(res.id ?? 0);
      if (employeeId !== 0) {
        this.newEmployeeObj.employeeId = employeeId;
        this.getEmpByID();
      }
    });
    this.$designationList = this.masterServ.getAllDesignations();

  }

  getEmpByID(){
    this.empservice.getEmpById(this.newEmployeeObj.employeeId).subscribe( {
      next: (employee) => {
        this.newEmployeeObj = employee;
      }
    });
  }

  saveEmployee(){
    this.empservice.saveEmployee(this.newEmployeeObj).subscribe({
      next: (response) => {
        console.log('Employee saved successfully:', response);
        alert("Employee saved successfully!");
        this.newEmployeeObj = new Employeemodel();
      },
      error: (error) => {
        console.error('Error saving employee:', error);
      }
    });
  }

  resetForm(){
    this.newEmployeeObj = new Employeemodel();
    // Implementation for resetting form
  }
}
