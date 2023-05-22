import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpServiceService } from 'src/app/emp-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss'],
})
export class FormPopupComponent implements OnInit {
  empForm: FormGroup;
  spinner: boolean = false;
  dataSource: any;
  educationArray$!: string[];
  name!: string;
  FirstName: any;
  DateofBirth: any;
  LastName: any;
  Email: any;
  gender: any;
  Education: any;
  Experience: any;
  Package: any;
  Company: any;
  id: any;
  source: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _employeeService: EmpServiceService,
    public _dialogRef: MatDialogRef<FormPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormPopupComponent //to get reference of a dialog here we inject DialogRef service from angular cdk/dialog
  ) {
    this.empForm = this._formBuilder.group({
      id: '',
      FirstName: '',
      LastName: '',
      Email: '',
      DateofBirth: '',
      gender: '',
      Education: '',
      Experience: '',
      Package: '',
      Company: '',
    });
  }

  ngOnInit(): void {
    console.log('data', this.data);

    this.empForm.get('FirstName')?.setValue(this.data.FirstName);
    this.empForm.get('LastName')?.setValue(this.data.LastName);
    this.empForm.get('Email')?.setValue(this.data.Email);
    this.empForm.get('DateofBirth')?.setValue(this.data.DateofBirth);
    this.empForm.get('gender')?.setValue(this.data.gender);
    this.empForm.get('Education')?.setValue(this.data.Education);
    this.empForm.get('Experience')?.setValue(this.data.Experience);
    this.empForm.get('Package')?.setValue(this.data.Package);
    this.empForm.get('Company')?.setValue(this.data.Company);

    this.name = this.data.name;
    this.onDropDownClick();
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      this._employeeService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          this.sendEmployeeListToParent();
        },
        error(err: any) {
          console.log(err);
        },
      });
    }
  }

  onDropDownClick() {
    this.spinner = true;
    this._employeeService.getDropDownList().subscribe({
      next: (val: any) => {
        // alert('Employee added successfully');
        this.educationArray$ = val;
        this.spinner = false;
      },
      error(err: any) {
        console.log(err);
      },
    });
  }

  selectionChange(e: any) {
    console.log('event', e);
  }

  sendEmployeeListToParent() {
    //here onEmployeeCreate return an observable so to subcribe this observable we have subcribe methhod
    this._employeeService.getAllEmplooyess().subscribe({
      next: (res) => {
        this._dialogRef.close({ data: res });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onUpdate() {
    console.log('in update');

    if (this.empForm.valid) {
      this._employeeService.onEdit(this.data.id, this.empForm.value).subscribe({
        next: (val: any) => {
          console.log('res', val);

          this.sendEmployeeListToParent();
        },
        error(err: any) {
          console.log(err);
        },
      });
    }
  }
}
