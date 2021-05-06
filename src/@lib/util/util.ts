import {Subject} from "rxjs";

export class Util {

  static setSearch(args: any) {
    this._searchObservable$.next(args);
  }

  static getSearch() {
    return this._searchObservable$;
  }

  private static _searchObservable$ = new Subject();
}
