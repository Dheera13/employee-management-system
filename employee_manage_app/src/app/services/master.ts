import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Departmentmodel } from '../models/Department.model';
import { DesignationListmodel, Designationmodel } from '../models/Designation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Master {
  apiUrl: string = 'https://localhost:7205/api';
  http = inject(HttpClient);

  getAllDepartments() {
    return this.http.get(`${this.apiUrl}/DepartmentMaster/GetAllDepartment`);
  }
  saveDept(obj:Departmentmodel){
    return this.http.post(`${this.apiUrl}/DepartmentMaster/AddDepartment`,obj);
  }
  updateDept(obj:Departmentmodel){
    return this.http.put(`${this.apiUrl}/DepartmentMaster/UpdateDepartment`,obj);
  }
  deleteDept(id:number){
    return this.http.delete(`${this.apiUrl}/DepartmentMaster/DeleteDepartment?id=${id}`);
  }

  getAllDesignations(): Observable<DesignationListmodel[]> {
    return this.http.get<DesignationListmodel[]>(`${this.apiUrl}/DesignationMaster/GetAll`);
  }
  saveDesignation(obj:Designationmodel){
    return this.http.post(`${this.apiUrl}/DesignationMaster/Create`,obj);
  }
  updateDesignation(obj:Designationmodel){
    return this.http.put(`${this.apiUrl}/DesignationMaster/Update?id=${obj.designationId}`,obj);
  }
  deleteDesignation(id:number){
    return this.http.delete(`${this.apiUrl}/DesignationMaster/Delete?id=${id}`);
  }
}
