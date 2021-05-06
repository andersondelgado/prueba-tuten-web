import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Constant} from "../@lib/constant/constant";
import {LoginComponent} from "./login/login.component";
import {LoginEnabledGuard} from "../@lib/guard/login-enabled.guard";
import {LoginDisabledGuard} from "../@lib/guard/login-disabled.guard";
import {BookingsComponent} from "./bookings/bookings.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {path: '', redirectTo: Constant.ROUTES.REDIRECT_TO, pathMatch: 'full'},
  {
    path: Constant.ROUTES.LOGIN,
    component: LoginComponent,
    canActivate: [LoginDisabledGuard]
  },
  {
    path: Constant.ROUTES.MAIN,
    component: MainComponent,
    canActivate: [LoginEnabledGuard],
    children: [
      {
        path: Constant.ROUTES.MAIN_CHILD.BOOKINGS,
        component: BookingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
