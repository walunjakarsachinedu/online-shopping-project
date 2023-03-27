import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (route, state) => {
    if(this.authService.isLogin()) return true;
    this.router.navigate(['/signin'], {
      queryParams: {
        "returnUrl": state.url 
      }
    });
    return false;
  }
}
