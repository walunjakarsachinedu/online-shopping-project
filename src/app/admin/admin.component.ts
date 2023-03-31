import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(public authService: AuthService) { }
}
