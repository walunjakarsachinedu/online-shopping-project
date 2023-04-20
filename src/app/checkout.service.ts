import { Injectable } from '@angular/core';
import { CartItem } from './common/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  products?: CartItem[];
  constructor() { }
}
