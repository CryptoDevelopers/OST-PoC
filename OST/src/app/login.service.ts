import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject }    from 'rxjs';

export interface Login {
  username: string;
  password: string;
}


@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  authenticateLogin(login: Login) {
    return this.http.post<Login>('http://localhost:8000/login', login);
  }
}
