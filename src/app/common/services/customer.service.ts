import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import { Customer } from "../models/customer";
import { DataService } from "./data.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class CustomerService extends DataService { 
  constructor(http: HttpClient) { 
    super(environment.apiUrl + "/customers", http);
  }

  public getCustomerByEmail(email: string): Observable<Customer[]> {
    return this.http.get(this.url + "?email=" + email, this.headers).pipe(map((v) => (v as (Customer[])))); 
  }
}