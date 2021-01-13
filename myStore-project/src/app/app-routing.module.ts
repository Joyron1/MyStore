import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ProductsComponent } from './Pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { PaymentComponent } from './pages/payment/payment.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
