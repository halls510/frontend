import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockApiInterceptor } from './interceptors/mock-api.service';
import { environment } from '.././environments/environment';
import { AdminModule } from './modules/admin/admin.module'; // 🔥 Importa o environment
import { ProductsManagementModule } from './modules/admin/pages/products-management/products-management.module';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    ProductsManagementModule,
    FormsModule
  ],
  providers: [
    ...(environment.useMockApi ? [{ provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true }] : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }