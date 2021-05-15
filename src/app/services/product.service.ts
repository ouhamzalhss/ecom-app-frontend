import { ProductCategory } from './../models/product-category';
import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  

  private baseUrl: string = 'http://localhost:9090/api/products';
  private categoryUrl: string = 'http://localhost:9090/api/product-category';

  constructor(private http: HttpClient) { }

  getProductsListPaginate(thePage: number, 
                          thePageSize: number, 
                          theCategoryId: number): Observable<GetResponseProduct>{
    // need to build URL based on Category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+
                      `&page=${thePage}&size=${thePageSize}`;

    return this.http.get<GetResponseProduct>(searchUrl);
  }


  getProductsList(theCategoryId: number): Observable<Product[]>{
    // need to build URL based on Category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  searchProductsList(value: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${value}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.http.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response=> response._embedded.productCategory)
    )
  }

  getProduct(theProductId: number): Observable<Product> {
    // need to build the URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.http.get<Product>(productUrl);
  }
  



}



interface GetResponseProduct{
  _embedded : {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCategory{
  _embedded : {
    productCategory: ProductCategory[];
  }
}