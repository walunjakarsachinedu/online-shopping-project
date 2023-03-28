import { Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuard{

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate: CanActivateFn = (route, state) => {
    if(this.authService.currentUser.admin) return true;
    this.router.navigate(['no-access']);
    return false; 
  }
}