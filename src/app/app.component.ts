import { Component } from '@angular/core';

interface Product {
  id: number,
  name: String,
  price: number,
}
interface CartItem {
  id: number,
  cartProduct: Product,
  total: number,
  amount: number
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'angular-template';
  products: Product[] = [{
    id: 0,
    name: 'Brot',
    price: 1.20
  }, {
    id: 1,
    name: 'Milch',
    price: 0.90
  }, {
    id: 2,
    name: 'Zipfer Märzen',
    price: 15.90
  }];
  cart: CartItem[] = [];
  total: number = 0;
  budget:  number = 0;
  isAddFormVisible: Boolean = false;
  isAddButtonVisible: Boolean = true;
  productName: String = '';
  productPrice: number = 0;
  isInputValid: Boolean = false;
  amount: number = 0;
  cartItem: CartItem = {} as CartItem;
  cartItems: CartItem[] = [];
  
  selectedProduct: number = 1;
  
  add(){
    this.isAddFormVisible = true;
    this.isAddButtonVisible = false;
  }
  addProduct(){
   
    this.products.push({id: (this.products[this.products.length-1].id+1),name: this.productName, price: this.productPrice})
    this.productPrice = 0;
    this.productName = '';
  }
  addToCart(){
  
    console.log(this.products[0])
      this.cartItem = {
        id: this.cart.length,
        cartProduct: this.products[this.selectedProduct],
        amount: this.amount,
        total: this.amount * this.products[this.selectedProduct].price
      }
      this.cart.push(this.cartItem)
      console.log(this.cart)

       this.total = 0;
      for (let index = 0; index < this.cart.length; index++) {
        this.total = this.cart[index].total + this.total

      }

      console.log(this.cart)

  }
  deleteCartItem(prodId: number){
    this.total = 0;
    this.cart.splice(prodId, 1);
    for (let index = 0; index < this.cart.length; index++) {
      this.total = this.cart[index].total + this.total

    }
  }
}
