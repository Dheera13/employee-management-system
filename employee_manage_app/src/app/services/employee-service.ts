import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Departmentmodel } from '../models/Department.model';
import { DesignationListmodel, Designationmodel } from '../models/Designation.model';
import { Observable } from 'rxjs';
import { Employeemodel, IEmployeeList } from '../models/Employeemodel';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string = 'https://employeeapi2026-fvgxc5cxf7f9d6ep.centralus-01.azurewebsites.net/api';

  http = inject(HttpClient);

  saveEmployee(obj: Employeemodel){
    return this.http.post(this.apiUrl + '/EmployeeMaster', obj);
  }

  getallEmployee(): Observable<IEmployeeList[]> {
    return this.http.get<IEmployeeList[]>(this.apiUrl + '/EmployeeMaster');
  }

  getEmpById(id: number): Observable<Employeemodel> {
    return this.http.get<Employeemodel>(this.apiUrl + '/EmployeeMaster/' + id);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.apiUrl + '/EmployeeMaster/' + id);
  }
}
