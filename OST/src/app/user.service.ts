import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface User {
  user_id: string,
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  linkedin_url: string;
  skills: string;
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(username: string): Observable<User> {
    return this.http.get<User>('http://localhost:8000/users/' + username);
  }

  insertUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/users/new', user);
  }

  deleteUser(username: string) {
    return this.http.delete('http://localhost:8000/users/delete/' + username);
  }
}
