import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../@lib/services/users.service";
import {Bookings} from "../../@lib/model/bookings";
import {Util} from "../../@lib/util/util";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  loading = false;
  fields = [
    {"id": 1, "name": "BrookingId"},
    {"id": 2, "name": "Cliente"},
    {"id": 3, "name": "Fecha creacion"},
    {"id": 4, "name": "Direccion"},
    {"id": 5, "name": "Precio"}];
  data: Array<Bookings> = [];

  constructor(private userSrv: UsersService) {
  }

  ngOnInit(): void {
    this.initBookings();
    this.filter();

  }

  initBookings() {
    this.loading = true;
    this.userSrv.bookings().then((res) => {
      this.loading = false;
      this.data = res;
      this.defaultTag();
    }).catch((err) => {
      console.log(err);
      this.loading = false;
    });
  }

  filter() {
    Util.getSearch().subscribe((res: any) => {
      console.log(res);
      let search = res.toString();
      console.log('search... ' + search);
      // let regxNum = /^(\d)$/;
      // let regxNum = /(\d)$/;
      // // let oldData = this.data;
      // if (regxNum.test(search)) {
      //   console.log('#search... ' + search);
      //   let filter = this.data.filter((i) => i.bookingId === parseInt(search));
      //   console.log(filter);
      //   this.data = filter;
      // } else {
      //   this.initBookings();
      //   // this.data = oldData;
      // }
      let filter: any;
      if (search.length > 0) {

        if (this.data?.filter((i) => (i.locationId.streetAddress).toUpperCase().toLowerCase().includes(search.toUpperCase().toLowerCase())).length > 0) {
          filter = this.data.filter((i) => i.locationId.streetAddress.toUpperCase().toLowerCase().includes(search.toUpperCase().toLowerCase()));
        } else if (this.data?.filter(i => i.tutenUserClient.firstName.toUpperCase().toLowerCase().includes(search.toUpperCase().toLowerCase()) || i.tutenUserClient.lastName.toUpperCase().toLowerCase().includes(search.toUpperCase().toLowerCase())).length > 0) {
          filter = this.data.filter(i => i.tutenUserClient.firstName.toUpperCase().toLowerCase().includes(search.toUpperCase().toLowerCase()) || i.tutenUserClient.lastName.toUpperCase().toLowerCase().includes(search.toUpperCase().toLowerCase()));
        }
        this.data = filter;
      } else {
        this.initBookings();
      }
    });
  }

  showFilter(i: any) {
    console.log(i);
    let el = 'filter_' + i.id;
    let el1 = 'btn_' + i.id;
    let e1: any = document.getElementById(el1);
    let e: any = document.getElementById(el);

    let e2: any = document.getElementById('select_5');
    if (i.id == 5) {
      e2.style.display = (e2.style.display == 'block') ? 'none' : 'block';
    }

    console.log(e);
    console.log(e1);
    if (e.style.display === 'block') {
      e.style.display = 'none';
      e1.style.display = 'block';
    } else {
      e.style.display = 'block';
      e1.style.display = 'none';
    }

    this.defaultTag();

  }

  defaultTag() {
    try {
      for (let z = 0; z < this.fields.length; z++) {
        let i = this.fields[z];
        let el = 'filter_' + i.id;
        let el1 = 'btn_' + i.id;
        let e1: any = document.getElementById(el1);
        let e: any = document.getElementById(el);

        switch (i.id) {
          case 2:
            e.style.display = 'none';
            e1.style.display = 'block';
            break;
          case 3:
            e.style.display = 'none';
            e1.style.display = 'block';
            break;
          case 4:
            e.style.display = 'none';
            e1.style.display = 'block';
            break;
          default:
            break;
        }

      }
    } catch (e) {

    }
  }

  inputFilter(i: any, e: any) {

    let el1 = 'btn_' + i.id;
    let el = 'filter_' + i.id;
    let ex1: any = document.getElementById(el1);
    let ex: any = document.getElementById(el);
    console.log(i);
    console.log(e);
    let filter: any;
    switch (i.id) {
      case 1:
        if (e.length > 0) {
          filter = this.data?.filter(i => i.bookingId === parseInt(e));
          this.data = filter;
        } else {
          this.initBookings();
        }
        ex.style.display = (ex.style.display == 'block') ? 'none' : 'block';
        ex1.style.display = (ex1.style.display == 'block') ? 'none' : 'block';
        break;
      case 2:
        filter = this.data.filter(i => i.tutenUserClient.firstName.includes(e) || i.tutenUserClient.lastName.includes(e));
        this.data = filter;
        ex.style.display = (ex.style.display == 'block') ? 'none' : 'block';
        ex1.style.display = (ex1.style.display == 'block') ? 'none' : 'block';
        break;
      case 3:
        // filter = this.data.filter(i =>{
        //   let date=new Date(i.bookingTime);
        // });
        // this.data = filter;
        break;
      case 4:
        break;
      case 5:
        // if (this.data.filter(i => i.bookingPrice >= parseInt(e)).length > 0) {
        //   filter = this.data.filter(i => i.bookingPrice >= parseInt(e));
        // } else if (this.data.filter(i => i.bookingPrice <= parseInt(e)).length > 0) {
        //   filter = this.data.filter(i => i.bookingPrice <= parseInt(e));
        // }
        // this.data = filter;
        // let ex2: any = document.getElementById('select_5');
        // ex2.style.display = (ex2.style.display == 'block') ? 'none' : 'block';
        //
        // // ex.style.display = (ex.style.display == 'block') ? 'none' : 'block';
        // ex1.style.display = (ex1.style.display == 'block') ? 'none' : 'block';
        break;
      default:
        break;
    }
  }

  calcMajorOrMinor(evt: any) {
    let el1 = 'btn_' + 5;
    let el = 'filter_' + 5;
    let ex1: any = document.getElementById(el1);
    let ex: any = document.getElementById(el);
    let ex2: any = document.getElementById('select_5');

    console.log(evt.target.value);
    let opt = evt.target.value;
    let e: any = ex.value;

    if (e.length === 0) {
      return;
    }

    let filter: any;
    if (opt === null || opt === undefined) {
      return;
    }

    if (opt === '1') {
      filter = this.data.filter(i => i.bookingPrice >= parseInt(e));
    } else if (opt === '2') {
      filter = this.data.filter(i => i.bookingPrice <= parseInt(e));
    } else {
      this.initBookings();
    }
    this.data = filter;

    // ex2.style.display = (ex2.style.display == 'block') ? 'none' : 'block';
    ex2.style.display = 'none';

    ex.style.display = (ex.style.display == 'block') ? 'none' : 'block';
    ex1.style.display = (ex1.style.display == 'block') ? 'none' : 'block';
  }
}
