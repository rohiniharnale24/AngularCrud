import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpServiceService } from '../emp-service.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss'],
})
export class EditButtonComponent implements OnInit {
  empForm: FormGroup;
  spinner: boolean = false;
  dataSource: any;
  ngOnInit(): void {}
  educationArray$!: string[];
  constructor(
    private _formBuilder: FormBuilder,
    private _employeeService: EmpServiceService,
    private _dialogRef: DialogRef<EditButtonComponent> //to get reference of a dialog here we inject DialogRef service from angular cdk/dialog
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
  onFormSubmit() {
    if (this.empForm.valid) {
      this._employeeService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added successfully');
          this._dialogRef.close();
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

  grtEmployeeList() {
    //here onEmployeeCreate return an observable so to subcribe this observable we have subcribe methhod
    this._employeeService.getAllEmplooyess().subscribe({
      next: (res) => {
        console.log('in res', res);
        this.dataSource = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
