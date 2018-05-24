import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { jobCard } from './jobCard'
//
// export interface Job {
//   job_id: number,
//   title: string;
//   description: string;
//   skills: string;
//   pay: number,
//   date_posted: string,
//   username: string;
// }

@Injectable()
export class JobsService {
  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<jobCard[]> {
    return this.http.get<jobCard[]>('http://localhost:8000/api/jobs/all');
  }

  getJob(job_id: string): Observable<jobCard> {
    return this.http.get<jobCard>('http://localhost:8000/api/jobs/' + job_id);
  }

  insertJob(job: jobCard): Observable<jobCard> {
    return this.http.post<jobCard>('http://localhost:8000/api/jobs/new', job);
  }

  deleteJob(job_id: string) {
    return this.http.delete('http://localhost:8000/api/jobs/delete/' + job_id);
  }
}
