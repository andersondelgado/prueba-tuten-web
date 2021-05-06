import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Constant} from "../../@lib/constant/constant";
import {Util} from "../../@lib/util/util";


declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.onToggle();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['./' + Constant.ROUTES.REDIRECT_TO]).then(r => console.log(r));
  }

  onToggle() {
    $('#menu-toggle').click((e: any) => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

  search($event: any) {
    console.log($event);
    Util.setSearch($event.target.value);
  }
}
