import { Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: SigninComponent}
];
