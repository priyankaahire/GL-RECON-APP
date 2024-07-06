import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ReconModel } from '../model/recon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'assets/data';

  constructor(private http: HttpClient) { }

  
  getAllRecon(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/recon-list.json`); // Path to your JSON file in the assets folder
  }
  getReconbyId(id: any): Observable<ReconModel> {
    return this.http.get<ReconModel>(`${this.baseUrl} + '/' + id`);
  }

  createRecon(recondata: any) {
    return this.http.post(`this.baseUrl`, recondata);
  }

  updateRecon(id: any, recondata: any) {
    return this.http.put(`this.baseUrl + '/' + id`, recondata);
  }

}