import { Component, inject, OnInit, signal } from '@angular/core';
import { Designationmodel,DesignationListmodel } from '../../models/Designation.model';
import { FormGroup, FormsModule,Validators, FormBuilder } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Master } from '../../services/master';
import { Departmentmodel } from '../../models/Department.model';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-designation',
  imports: [FormsModule, ReactiveFormsModule, CommonModule,AsyncPipe],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation implements OnInit {
 designationForm!: FormGroup;

  // ✅ Lists
  $designationList: Observable<DesignationListmodel[]> =new Observable<DesignationListmodel[]>();
  departmentList: any[] = [];

  // ✅ Track Edit Mode
  selectedDesignationId: number = 0;
  isloading = signal(false);

  constructor(
    private fb: FormBuilder,
    private masterService: Master
  ) {}

  ngOnInit(): void {
    this.getAllDesignations();
    this.getAllDepartments();
    this.initializeForm();
  }

  // ✅ FORM INITIALIZATION
  initializeForm() {
    this.designationForm = this.fb.group({
      designationId: [0],
      departmentId: [0, Validators.required],
      designationName: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  // ✅ GET ALL DEPARTMENTS
  getAllDepartments() {
    this.masterService.getAllDepartments().subscribe({
      next: (res: any) => {
        this.departmentList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ✅ GET ALL DESIGNATIONS
  getAllDesignations() {
    this.$designationList=this.masterService.getAllDesignations();
  }

  // ✅ SAVE OR UPDATE
  onSave() {

    if (this.designationForm.invalid) {
      this.designationForm.markAllAsTouched();
      return;
    }

    const formValue = this.designationForm.value;
    this.isloading.set(true)
    if (this.selectedDesignationId == 0) {

      // ✅ CREATE
      this.masterService.saveDesignation(formValue).subscribe({
        next: () => {
          alert('Designation saved successfully');
          this.resetForm();
          this.getAllDesignations();
              this.isloading.set(false)

        },
        error: (err) => {
          console.error(err);
          this.isloading.set(false);
        }
      });

    } else {

      // ✅ UPDATE
      this.masterService.updateDesignation(formValue).subscribe({
        next: () => {
          alert('Designation updated successfully');
          this.resetForm();
          this.getAllDesignations();
              this.isloading.set(false)

        },
        error: (err) => {
          console.error(err);
          this.isloading.set(false);
        }
      });

    }
  }

  // ✅ EDIT
  onEdit(item: any) {

    this.selectedDesignationId = item.designationId;

    this.designationForm.patchValue({
      designationId: item.designationId,
      departmentId: item.departmentId,
      designationName: item.designationName
    });
  }

  // ✅ DELETE
  onDelete(id: number) {

    const isDelete = confirm('Are you sure you want to delete?');

    if (isDelete) {
    this.isloading.set(true)

      this.masterService.deleteDesignation(id).subscribe({
        next: () => {
          this.getAllDesignations();
          this.isloading.set(false)
        },
        error: (err) => {
          console.error(err);
          this.isloading.set(false);
        }
      });

    }
  }

  // ✅ RESET FORM
  resetForm() {

    this.selectedDesignationId = 0;

    this.designationForm.reset({
      designationId: 0,
      departmentId: 0,
      designationName: ''
    });
  }

  // ✅ EASY ACCESS FOR VALIDATION
  get f() {
    return this.designationForm.controls;
  }
}