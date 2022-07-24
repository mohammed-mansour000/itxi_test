import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  loginWithGoogle() {
    this.authService.loginWithGoogle()
  }
  logOut(): void {
    this.authService.logOut();
  }

}