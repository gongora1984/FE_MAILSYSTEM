import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {fadeInUp400ms} from "../../../helpers/animations/fade-in-up.animations";
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {LoginDto} from "../../../models/login/login-dto";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ],
})
export class SignInComponent implements OnInit{
 signin: FormGroup;

  hide = true;

  constructor(private fb: FormBuilder,
              private _router: Router,
              private authservice: AuthenticationService,
  ) {
    this.signin = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(4)]],
    });
  }

  ngOnInit() {

  }

  signIn(): void {
    const user: LoginDto = {
      email: this.signin.value.email,
      password: this.signin.value.password
    };

     this.authservice.login(user).subscribe(
       {
         next: res => {
           this.authservice.setLocalStorage(res.apiKey);
           //this._router.navigate(['dashboard']);
         },
         error: (err: any) => {
           //TODO: display error

         },
         complete: () => {
         }
      }
     );
  }

}
