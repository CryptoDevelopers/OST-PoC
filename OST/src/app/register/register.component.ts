import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User
  model = new User();
  submitted = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  newUser() {
      this.submitted = true;
      this.userService.insertUser(this.model)
        .subscribe(user => this.user = user)

  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
