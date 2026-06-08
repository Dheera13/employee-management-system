import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Departmentmodel } from '../models/Department.model';
import { DesignationListmodel, Designationmodel } from '../models/Designation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Master {
  //apiUrl: string = 'https://employeeapi2026-fvgxc5cxf7f9d6ep.centralus-01.azurewebsites.net/api';
  apiUrl: string = 'http://localhost:5162/api';
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
  askAi(question: string) {
  return this.http.post<any>(
    `${this.apiUrl}/AiAssistant/ask`,
    { question: question }
  );
}
}
