import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpServiceService {
  displayedColumn: string[] = [
    'id',
    'firstName',
    'LastName',
    'email',
    'dateOfBirth',
    'gender',
    'education',
    'company',
    'experience',
    'package',
  ];
  constructor(private _http: HttpClient) {}
  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employee', data);
  }

  getDropDownList(): Observable<any> {
    return this._http.get('http://localhost:3000/dropdown');
  }
  getAllEmplooyess() {
    return this._http.get('http://localhost:3000/employee');
    // this.dataSource = new MatTableDataSource();
  }
}

export interface FormValues {
  id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  DateofBirth: string;
  gender: string;
  Education: string;
  Experience: string;
  Package: string;
  Company: string;
}
