import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, ObservedValueOf } from "rxjs";
import { Cart } from "../models/cart";
import { DataService } from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService extends DataService {
  constructor(http: HttpClient) { 
    super("http://10.1.27.225:3000/cart", http);
  }

  public getById(userId: string) {
    return this.http.get(this.url + "?userId=" + userId, this.headers).pipe(map((v) => (v as (Cart[])))); 
  }
  
  // public changeProductQuantity(userId: string, productId: string, quantity: number) {
  //   return this.http.patch(
  //     this.url, 
  //     [
  //       {
  //         "userId": userId,
  //         "products": [
  //           { "id": productId, "quantity": quantity },
  //         ],
  //       },
  //     ],
  //     this.headers,
  //   ).subscribe();
  // }
}


// I coded several pages for the shopping app, including the sign-up page, sign-in page, and products page. Additionally, I created a page for managing products that is accessible only to administrators