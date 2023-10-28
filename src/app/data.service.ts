import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  private sharedData: any;
  editId: number = +localStorage.getItem('diplayIndex');

  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData() {
    return this.sharedData;
  }

  // *************** API Calls *******************

  getData() {
    return this.http.get(this.url + 'users');
  }
  fetchData(id: number) {
    return this.http.get(this.url + 'users/' + id);
  }

  postData(data: any) {
    return this.http.post(this.url + 'users', data);
  }

  putData(data: any) {
    return this.http.put(this.url + 'users/' + this.editId, data);
  }

  deleteData(id: number) {
    return this.http.delete(this.url + 'users/' + id);
  }
}
