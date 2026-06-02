export class Employeemodel {

  employeeId: number;
  city: string;
  contact: string;
  designationId: number;
  name: string;
  email: string;
  state: string;
  pincode: string;
  alternateNbr: string;
  address: string;
  createdDate: Date | null;
  modifiedDate: Date | null;
  role: string;

  constructor() {

    this.employeeId = 0;
    this.city = '';
    this.contact = '';
    this.designationId = 0;
    this.name = '';
    this.email = '';
    this.state = '';
    this.pincode = '';
    this.alternateNbr = '';
    this.address = '';
    this.createdDate = null;
    this.modifiedDate = null;
    this.role = '';

  }
}

export interface IEmployeeList {

  employeeId: number;
  name: string;
  contact: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  alternateNbr: string;
  address: string;

  designationId: number;
  designationName: string;

  departmentId: number;
  departmentName: string;

  role: string;

  createdDate: Date | null;
  modifiedDate: Date | null;

}