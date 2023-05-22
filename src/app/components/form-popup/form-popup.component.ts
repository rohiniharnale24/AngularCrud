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
        this.dataSource = res;
        this._dialogRef.close({ data: res });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
