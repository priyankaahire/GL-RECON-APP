import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FilterParams, ReconModel } from '../model/recon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'assets/data';
  private apiUrl = 'https://your-backend-api.com/data'; // Replace with your API URL

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

  getAllKeys() {
    return this.http.get<any>(`${this.baseUrl}/keys-list.json`); // Path to your JSON file in the assets folder

  }
  getAllMeasures() {
    return this.http.get<any>(`${this.baseUrl}/measures-list.json`); // Path to your JSON file in the assets folder
  }


  getPaginationData(params: FilterParams) {
    return this.http.post<any>(`${this.apiUrl}`, params);
  }

  getFilterData(param:any) {
    let cutsomeQuery = ''
  }

}