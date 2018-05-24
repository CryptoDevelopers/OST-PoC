import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedinUser: string
  title = 'app';

  userLoggedin(username: string){
    this.loggedinUser = username
  }
}
