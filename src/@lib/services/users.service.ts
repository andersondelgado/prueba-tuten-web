import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";
import {Credentials} from "../model/credentials";
import {Constant} from "../constant/constant";
import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
import {Bookings} from "../model/bookings";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpService) {
  }

  login(input: Credentials): Promise<any> {
    let oldUrl = Constant.ENDPOINTS.USER.BY_EMAIL.replace('{email}', input.email);
    let url = oldUrl;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "password": input.password
      })
    };
    return this.http.put(url, {}, httpOptions).toPromise();
  }

  bookings(current = true): Promise<Array<Bookings>> {
    let oldUrl = Constant.ENDPOINTS.USER.BOOKINGS.replace('{email}', environment.contact).replace('{current}', String(current));
    let url = oldUrl;
    return this.http.get(url).toPromise();
  }
}
