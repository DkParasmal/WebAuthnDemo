import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}
  
  public url ="https://localhost:44329";
  //#region  register
  
  getCrdentialOptionData(formData: FormData): Observable<any> {
    let action ="/makeCredentialOptions"
    return this.http.post(this.url+action, formData);
  }

  postRegisteredata(formData: any): Observable<any> {
    let action ="/makeCredential"
    return this.http.post(this.url+action, formData);
  }

  //#endregion

  //#region Authentication
  getAttestationOptionData(formData: FormData): Observable<any> {
    let action ="/assertionOptions"
    return this.http.post(this.url+action, formData);
  }
  postVerificationdata(formData: any): Observable<any> {
    let action ="/makeAssertion"
    return this.http.post(this.url+action, formData);
  }

  //#endregion

  getDemo(): Observable<any> {
    let action ="/demo"
    return this.http.get(this.url+action);
  }
}
