import { Injectable } from '@angular/core';
import { jobCard } from './jobCard';
import { JOBCARDS } from './mockJobs';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsUrl = 'api/jobs';  // URL to web api

  getJobs(): Observable<jobCard[]> {
    return of(JOBCARDS)
  }

  getJob(id: number): Observable<jobCard>{
    return of(JOBCARDS.find(job => job.id === id));
  }

  constructor(private http: HttpClient) { }
}
