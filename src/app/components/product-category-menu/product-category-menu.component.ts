import { ProductService } from './../../services/product.service';
import { ProductCategory } from './../../models/product-category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategory: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProductCategories();
  }

  getProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategory = data;
      });
    
  }

}
