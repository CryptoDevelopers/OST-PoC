import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JobListComponent } from './job-list/job-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { JobsService }  from './jobs.service';
import { NewjobformComponent } from './newjobform/newjobform.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JobListComponent,
    JobDetailComponent,
    RegisterComponent,
    LoginComponent,
    NewjobformComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UserService,
    JobsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
