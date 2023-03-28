import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLogin()) {
      this.router.navigate(['/products']);
    } else {
      this.router.navigate(['/signin'])
    }
  }

}
