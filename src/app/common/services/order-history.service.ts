import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService extends DataService {
  constructor(http: HttpClient) { 
    super("http://10.1.27.225:3000:3000/order-history", http);
  }

  getById(id: string) : Observable<Order[] | undefined> {
    return this.http.get(this.url + "/" + id, this.headers).pipe(map((v: any) => v.history as (Order[] | undefined)))
  }

}
