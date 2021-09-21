import { Component } from '@angular/core';

interface Product {
  id: number,
  name: String,
  price: number,
}
interface Cart {
  product: Product,
  amount: number,
  total: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-template';
  products: Product[] = [{
    id: 1,
    name: 'Brot',
    price: 1.20
  }, {
    id: 2,
    name: 'Milch',
    price: 0.90
  }, {
    id: 3,
    name: 'Zipfer Märzen',
    price: 15.90
  }];
  cart: Cart[] = [];
  total: number = 0;
  budget:  number = 0;
  isAddFormVisible: Boolean = false;
  isAddButtonVisible: Boolean = true;
  productName: String = '';
  productPrice: number = 0;
  isInputValid: Boolean = false;
  amount: number = 0;
  
  selectedProduct: number = 0
  add(){
    this.isAddFormVisible = true;
    this.isAddButtonVisible = false;
  }
  addProduct(){
   
    this.products.push({id: (this.products[this.products.length-1].id + 1),name: this.productName, price: this.productPrice})
    this.productPrice = 0;
    this.productName = '';
  }
  addToCart(){
      console.log(this.selectedProduct)
  }
}
