import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/servecis/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthentificationService,
    private _router: Router
  ) {}

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.authService.getUserData().subscribe(
      (data) => {
        const found = data.find(
          (user: any) =>
            user.email == this.loginForm.value.email &&
            user.password == this.loginForm.value.password
        );
        if (found) {
          localStorage.setItem('statut', 'connected');
          this._router.navigate(['quiz/pass-quiz']);
        } else alert('please verify your email & password');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
