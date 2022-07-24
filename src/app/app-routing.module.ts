import { AuthGuard } from './guards/auth.guard';
import { PreviewBookComponent } from './pages/preview-book/preview-book.component';
import { AuthorSearchComponent } from './pages/author-search/author-search.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'author-search',
    component: AuthorSearchComponent,
    data: {
      shouldDetach: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'book/:id',
    component: PreviewBookComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
