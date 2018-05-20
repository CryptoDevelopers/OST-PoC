import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Application {
  application_id: string,
  job_id: string;
  username: string;
  date_applied: string;
  message: string;
}

@Injectable()
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getApplication(application_id: string): Observable<Application> {
    return this.http.get<Application>('http://localhost:8000/applications/' + application_id);
  }

  insertApplication(application: Application): Observable<Application> {
    return this.http.post<Application>('http://localhost:8000/applications/new', application);
  }
}
