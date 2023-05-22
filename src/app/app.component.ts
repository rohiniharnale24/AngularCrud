import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpServiceService, FormValues } from './emp-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormPopupComponent } from './components/form-popup/form-popup.component';
import { DialogRef } from '@angular/cdk/dialog';

/** Constants used to fill up our data base. */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crudAngular';
  openedDialog: any;
  constructor(
    private _dialog: MatDialog,
    private _employeeService: EmpServiceService
  ) {}

  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Email',
    'DateofBirth',
    'gender',
    'Education',
    'Experience',
    'Package',
    'Company',
    'Action',
  ];
  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.grtEmployeeList();
  }
  onAddEmployee() {
    let openedDialog = this._dialog.open(FormPopupComponent, {
      data: { name: 'rohan', lName: 'harnale' },
    });

    openedDialog.afterClosed().subscribe((result) => {
      console.log('result', result);
      this.dataSource = result.data;
    });
  }
  grtEmployeeList() {
    //here onEmployeeCreate return an observable so to subcribe this observable we have subcribe methhod
    this._employeeService.getAllEmplooyess().subscribe({
      next: (res) => {
        console.log('in res', res);
        this.dataSource = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(id: any) {
    console.log(id);
    this._employeeService.onDelete(id).subscribe({
      next: (res) => {
        console.log('in res', res);
        this.grtEmployeeList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onEdit(id: any) {
    // this._employeeService.onEdit(id);
    this._employeeService.getEmployeeById(id).subscribe({
      next: (res) => {
        this._dialog
          .open(FormPopupComponent, {
            data: { ...res, source: 'update' },
          })
          .afterClosed()
          .subscribe((result) => {
            this.dataSource = result.data;
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
