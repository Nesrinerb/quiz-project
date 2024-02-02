import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/servecis/authentification.service';
import { passwordValidator } from './passwordValidator';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent {
  userForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
      confpassword: new FormControl(''),
    }
    // ,
    // { validator: passwordValidator  }
  );
  constructor(
    private _fb: FormBuilder,
    private authService: AuthentificationService,
    private _router: Router
  ) {}

  get name() {
    return this.userForm.get('name');
  }
  get address() {
    return this.userForm.get('address');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get genre() {
    return this.userForm.get('genre');
  }
  get date() {
    return this.userForm.get('date');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confpassword() {
    return this.userForm.get('confpassword');
  }

  registerUserForm() {
    console.log(this.userForm.value);
    this.authService.registerUserData(this.userForm.value).subscribe(
      (response) => {
        console.log('success', response);
        this._router.navigate(['quiz/pass-quiz']);
      },
      (error) => console.error('error!', error)
    );
  }
}
