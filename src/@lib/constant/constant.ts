import {environment} from "../../environments/environment";

export class Constant {
  private static API = environment.endpoint;

  public static ENDPOINTS = {
    USER: {
      BY_EMAIL: Constant.API + `user/{email}`,
      BOOKINGS: Constant.API + `user/{email}/bookings?current={current}`
    }
  }

  public static ROUTES = {
    LOGIN: 'login',
    MAIN: 'main',
    MAIN_CHILD: {
      BOOKINGS: 'bookings',
    },
    REDIRECT_TO: 'login',
    REDIRECT_TO_MAIN: 'main/bookings'
  }

}
