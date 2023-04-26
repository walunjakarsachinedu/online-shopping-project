import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, ObservedValueOf } from "rxjs";
import { Cart } from "../models/cart";
import { DataService } from "./data.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService extends DataService {
  constructor(http: HttpClient, authService: AuthService) { 
    super("http://10.1.27.225:3000/cart", http);
    this.getById(authService.userId ?? '').subscribe(
      (cart) => this.cartProductCount.next(cart.products.length)
      );
  }
  cartProductCount = new BehaviorSubject<number>(0);


  public updateCartCount(count: number) {
    this.cartProductCount.next(count);
  }

  public getById(userId: string) : Observable<Cart> {
    return this.http.get(this.url + "/" + userId, this.headers).pipe(map((v) => (v as Cart))); 
  }

  public deleteById(userId: string) {
    return this.http.delete(this.url + "/" + userId, this.headers); 
  }
}

