import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class ProductService extends DataService { 
  constructor(http: HttpClient) { 
    super("http://localhost:3000/products", http);
  }
}