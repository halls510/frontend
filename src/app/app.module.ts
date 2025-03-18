import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockApiInterceptor } from './interceptors/mock-api.service';
import { environment } from '.././environments/environment'; // 🔥 Importa o environment

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ...(environment.useMockApi ? [{ provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true }] : [])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }