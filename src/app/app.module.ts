import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpService} from "../@lib/common/http.service";
import {InterceptorService} from "../@lib/common/interceptor.service";
import { LoginComponent } from './login/login.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MainComponent } from './main/main.component';
import {UsersService} from "../@lib/services/users.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
