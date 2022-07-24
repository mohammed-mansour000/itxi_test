import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  socialUser!: SocialUser;
  isFixedHeader = true;
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      if(user != null){
        localStorage.setItem("user", JSON.stringify(user))
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      this.router.navigate(['/author-search'])
      this.toastr.success(`welcome ${res?.name}`)
    });
  }
  logOut(): void {
    this.socialAuthService.signOut()
    .then(res => {
      this.router.navigate(['/'])
      localStorage.removeItem("user")
    })
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem("user");
  }
}
