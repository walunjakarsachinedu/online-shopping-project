import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "../models/product";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class ProductService extends DataService { 
  constructor(http: HttpClient) { 
    super("http://localhost:3000/products", http);
  }

  getById(id: string): Observable<Product[]> {
    return this.http.get(this.url + "?id=" + id).pipe(map(v => v as Product[]));
  }
}