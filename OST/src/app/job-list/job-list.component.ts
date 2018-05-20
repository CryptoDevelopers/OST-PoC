import { Component, OnInit } from '@angular/core';
import { jobCard } from '../jobCard'
import { JobService } from '../job.service'

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobcards: jobCard[];

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.getJobs();
  }

  getJobs(): void {
    this.jobService.getJobs()
    .subscribe(jobcards => this.jobcards = jobcards)

    console.log('done getting jobs')
  }

}
