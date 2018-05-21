import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { jobCard } from '../jobCard';
import { JobService }  from '../job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
@Input() job: jobCard;

  constructor(
  private route: ActivatedRoute,
  private jobService: JobService,
  private location: Location
) {}

  ngOnInit() {
    this.getJob();
  }

  getJob(): void {
    const id = +this.route.snapshot.paramMap.get('jobs_id');
    this.jobService.getJob(id)
    .subscribe(job => this.job = job);
  }

  goBack(): void {
      this.location.back();
    }
}
