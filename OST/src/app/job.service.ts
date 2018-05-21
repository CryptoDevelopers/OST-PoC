import { Injectable } from '@angular/core';
import { jobCard } from './jobCard';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  mapping:jobCard[] = [];
  jobInstance: jobCard[] = [];

  constructor(private http: HttpClient) { }

  getJobs(): Observable<jobCard[]> {
    console.log('wheres all the data?!?!')
    return this.http.get('http://localhost:8000/api/jobs/all')
    .map((data:any[]) =>
    {
      console.log('got something')
      if (data.length){
        console.log('getting all the jobs')
        this.mapping = this.jobmapping(data);
        console.log(this.mapping)
        return (this.mapping)
      }
      else {
        console.log('got no data')
      }
    })
    .catch(this.handleError);
  }

  getJob(id: number): Observable<jobCard>{
    return this.http.get('http://localhost:8000/api/jobs/' + id)
    .map((data:any) =>
    {
      if (data.length){
        this.jobInstance = data[0];
        console.log('getting one job')
        //this.jobInstance = this.jobmapping(data)
        //console.log(this.jobInstance[0])
        return (data[0])
      }
    })
    //return of(JOBCARDS.find(job => job.id === id));
  }

  public handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }

  private jobmapping(data: any[]): jobCard[]{
    var mappedJobs:jobCard[] = [];
    var tempJob: jobCard;

    for(var resp in data){
      tempJob = {
        jobs_id: data[resp]['job_id'],
        date: data[resp]['date_posted'],
        title: data[resp]['title'],
        description: data[resp]['description'],
        skills: data[resp]['skills'],
        pay: data[resp]['pay'],
        username: data[resp]['username']
      }

      mappedJobs.push(tempJob);
    }

    return mappedJobs;
  }
}
