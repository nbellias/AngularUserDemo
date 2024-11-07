import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SigninComponent} from './components/signin/signin.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
