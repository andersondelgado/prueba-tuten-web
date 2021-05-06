import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersService} from "../../@lib/services/users.service";
import {Credentials} from "../../@lib/model/credentials";
import {Constant} from "../../@lib/constant/constant";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: FormGroup | any;
  credentials: Credentials = {
    email: '',
    password: ''
  }
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userSrv: UsersService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.model = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submit(form: NgForm) {

    let payload: Credentials = Object.assign(this.credentials, form);
    this.loading = true;
    this.userSrv.login(payload).then((res) => {
      console.log(res);
      localStorage.setItem('token', res['sessionTokenBck']);
      const nav = Constant.ROUTES.REDIRECT_TO_MAIN;
      this.loading = false;
      this.router.navigate(['./' + nav]).then((r) => console.log(r));
    }).catch((err) => {
      this.loading = false;
    });
  }
}
