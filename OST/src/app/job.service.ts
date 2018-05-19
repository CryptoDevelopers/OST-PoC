import { Injectable } from '@angular/core';
import { jobCard } from './jobCard';
import { JOBCARDS } from './mockJobs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  getJobs(): Observable<jobCard[]> {
    return of(JOBCARDS)
  }

  getJob(id: number): Observable<jobCard>{
    return of(JOBCARDS.find(job => job.id === id));
  }

  constructor() { }
}
