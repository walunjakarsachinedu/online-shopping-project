import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  login(credential: {email?: string | null, password?: string | null}) {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InNhY2hpbiB3YWx1bmpha2FyIiwiaWF0IjoxNTE2MjM5MDIyfQ.KWM_qHWyFlk3rW4glh-r7AokUnZJvmbHnPvYDFsbYBs")
    this.activatedRoute.queryParamMap.subscribe(
      route => {
        console.log("__return route:", route.get("returnUrl"));
        this.router.navigate([route.get("returnUrl") || "/products"]);
      }
    );
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
  
  get currentUser() {
    let token = localStorage.getItem("token");
    if(!token) return null;
    return new JwtHelperService().decodeToken(token);
  }
}
