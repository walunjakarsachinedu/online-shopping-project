import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { ShoppingCartService } from '../common/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount?: number;
  isCollapsed = false;
  constructor(
    public authService: AuthService,
    public cartService: ShoppingCartService,
  ) { }

  ngOnInit(): void {
    this.cartService.cartProductCount.subscribe(count => this.cartItemCount = count);
  }

}
