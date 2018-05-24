import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  model = new User();
  loggedin = false;

  constructor(private userService: UserService) { }

  newUser() {
      this.loggedin = true;
      console.log("logged in user " + this.model.username)
      this.userService.getUser(this.model.username)
        .subscribe(user => this.username = user.username)

      this.username = this.model.username

  }
  ngOnInit() {
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
