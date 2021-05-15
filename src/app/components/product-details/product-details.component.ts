import { CartItem } from './../../models/cart-item';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(()=> {
        this.handleProductDetails();
    });

  }
  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(theProductId).subscribe(
      data => {
            this.product = data;
      });
  }

  addToCart(){
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}
