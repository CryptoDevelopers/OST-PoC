import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent }     from './job-list/job-list.component'
import { JobDetailComponent }   from './job-detail/job-detail.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'job/:jobs_id', component: JobDetailComponent},
  { path: 'dashboard', component: JobListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
