import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent }     from './job-list/job-list.component'
import { JobDetailComponent }   from './job-detail/job-detail.component'
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'job/:jobs_id', component: JobDetailComponent},
  { path: 'dashboard', component: JobListComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
