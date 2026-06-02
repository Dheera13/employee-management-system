import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { Departmentmodel } from '../../models/Department.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Master } from '../../services/master';
@Component({
  selector: 'app-department',
  imports: [FormsModule, NgClass],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  newDeptObj: Departmentmodel = new Departmentmodel();
  masterservice: Master = inject(Master);
  deptList=signal<Departmentmodel[]>([]);

  ngOnInit() : void {
    this.getAllDepartments();
  }

  saveDepartment() {
    this.masterservice.saveDept(this.newDeptObj).subscribe({
      next:(result:any)=>{
        alert('Department saved successfully');
        this.getAllDepartments();
      },
      error:(err:any)=>{
        alert(err.error);
      }
    });
  }

  updateDepartment() {
    this.masterservice.updateDept(this.newDeptObj).subscribe({
      next:(result:any)=>{
        alert('Department updated successfully');
        this.getAllDepartments();
      },
      error:(err:any)=>{
        alert(err.error);
      }
    });
  }

  OnEdit(dept:Departmentmodel){
    const strData = JSON.stringify(dept);
    const parsedata = JSON.parse(strData);
    this.newDeptObj=parsedata;
  }


  resetForm() {
    this.newDeptObj = new Departmentmodel();
  }
  OnDelete(dept:Departmentmodel){
    if(confirm('Are you sure to delete?')){
      dept.isActive=false;
      this.masterservice.deleteDept(dept.departmentId).subscribe({
        next:(result:any)=>{
          alert('Department deleted successfully');
          this.getAllDepartments();
        },
        error:(err:any)=>{
          alert(err.error);
        }
      });
    }
  }
  
  getAllDepartments() { 
    this.masterservice.getAllDepartments().subscribe( {
      next:(result:any)=>{
        this.deptList.set(result);
      }
    });
  }
}
