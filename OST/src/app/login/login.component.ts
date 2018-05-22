import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User
  model = new User();
  submitted = false;

  constructor(private userService: UserService) { }

  newUser() {
      this.submitted = true;
      this.userService.insertUser(this.model)
        .subscribe(user => this.user = user)

  }
  ngOnInit() {
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
