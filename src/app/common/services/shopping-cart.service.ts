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

  public getById(userId: string) : Observable<Cart> {
    return this.http.get(this.url + "/" + userId, this.headers).pipe(map((v) => (v as Cart))); 
  }
}

