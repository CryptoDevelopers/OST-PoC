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
  skills = ['Javascript', 'Python',
            'AWS', 'C++'];
model = new User();
  submitted = false;

  constructor(private userService: UserService) { }


  onSubmit() { this.submitted = true; }

  newUser() {
    this.model = new User();
    this.userService.insertUser(this.model)
      .subscribe(user => this.user = user)
  }
  ngOnInit() {
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
