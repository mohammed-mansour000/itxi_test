import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//angular material
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//components
import { AuthorSearchComponent } from './pages/author-search/author-search.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { AuthorPipe } from './pipes/author.pipe';
import { PreviewBookComponent } from './pages/preview-book/preview-book.component';
import { ModalComponent } from './components/modal/modal.component';
import { CustomRouteReuseStrategy } from './services/cache-router';
import { RouteReuseStrategy } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AuthorSearchComponent,
    BookCardComponent,
    HeaderComponent,
    AuthorPipe,
    PreviewBookComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot(),
    SocialLoginModule,
    NgbModule,
    //angular material
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '992806205402-u2fdi7bi6fomha6jeoev54ga5br4lh5v.apps.googleusercontent.com',{
                scope: 'email',
                plugin_name: "ITXITest"
              }

            ),
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
