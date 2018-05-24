import { Component, OnInit } from '@angular/core';

import { jobCard } from '../jobCard';
import { JobsService }  from '../jobs.service';

@Component({
  selector: 'app-newjobform',
  templateUrl: './newjobform.component.html',
  styleUrls: ['./newjobform.component.css']
})
export class NewjobformComponent implements OnInit {
  newJob: jobCard;
  model = new jobCard();

  constructor( private jobsService: JobsService ) { }

  ngOnInit() {

      this.model.username="";
    this.model.job_id=999;
    this.model.date_posted="";
  }

  postJob() {
      this.jobsService.insertJob(this.model)
      .subscribe(newJob => this.newJob = newJob)

    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }


}
