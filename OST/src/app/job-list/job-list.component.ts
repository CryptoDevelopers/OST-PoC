import { Component, OnInit } from '@angular/core';
import { jobCard } from '../jobCard'
import { JOBCARDS } from '../mockJobs'

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
jobcards = JOBCARDS;
  constructor() { }

  ngOnInit() {
  }

}
