import { Purchase } from './../models/purchase';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl: string = "http://localhost:9090/api/checkout/purchase";

  constructor(private http: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.http.post<GetResponsePurchase>(this.purchaseUrl, purchase);
    // .pipe(
    //   map(response=> response.orderTrackingNumber)
    // )
  }

}

interface GetResponsePurchase{
      orderTrackingNumber: string;
}
