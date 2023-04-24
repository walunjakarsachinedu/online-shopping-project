import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, map, Observable, of } from "rxjs";
import { Customer } from "../models/customer";
import { CustomerService } from "./customer.service";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class AuthService{
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private customerService: CustomerService, private http: HttpClient) {}

  login(credential: {email?: string | null, password?: string | null}): Observable<boolean> {
    let dataservice = new DataService("http://10.1.27.225:3000/login", this.http);
    return dataservice.post(credential)
    .pipe(map((token) => this.saveUserDetails(token)))
    .pipe(catchError((error) => of(false)));
  }

  saveUserDetails(token: any) : boolean {
    let user = new JwtHelperService().decodeToken(token.token);
    localStorage.setItem("token", token.token);
    localStorage.setItem("id", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    return true;
  }

  createUser(customer: Customer) {
    let dataservice = new DataService("http://10.1.27.225:3000/customers", this.http);
    return dataservice.post(customer)
    .pipe(map((customer) => {
      return customer != null;
    })).pipe(catchError((error) => of(false)));
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/signin"]);
  }

  isLogin():boolean {
    let token = localStorage.getItem("token");
    if(!token) return false;
    let helper = new JwtHelperService();
    let isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  get userId() {
    return localStorage.getItem("id");
  }

  get userName() {
    return localStorage.getItem("name");
  }

  get userEmail() {
    return localStorage.getItem("email");
  }
  
  get currentUser() {
    let token = localStorage.getItem("token");
    if(!token) return null;
    return new JwtHelperService().decodeToken(token);
  }
}

