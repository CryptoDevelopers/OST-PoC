import { Component, OnInit } from '@angular/core';
import { User } from '../user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  skills = ['Javascript', 'Python',
            'AWS', 'C++'];

  model = new User(18, 'user1', this.skills[0], 'Chuck', 'Overstreet', 'a@o.com');

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
