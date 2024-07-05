import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ReconModel } from '../model/recon';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:4200/components/general-ledger-list'

  
  getAllRecon(): Observable<any> {
    return this.http.get<any>('assets/recon-list.json'); // Path to your JSON file in the assets folder
  }
  getReconbyId(id: any): Observable<ReconModel> {
    return this.http.get<ReconModel>(this.apiurl + '/' + id);
  }

 

  createRecon(recondata: any) {
    return this.http.post(this.apiurl, recondata);
  }

  updateRecon(id: any, recondata: any) {
    return this.http.put(this.apiurl + '/' + id, recondata);
  }

}