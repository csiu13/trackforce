import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe.decorator';
import { Router } from '@angular/router';

import { Interview } from '../../models/interview.model';
import { InterviewService } from '../../services/interview-service/interview.service';


/**
*@description This will be for the staging manager to provide feedback from the client
*/
@Component({
  selector: 'app-interviews-view',
  templateUrl: './interviews-view.component.html',
  styleUrls: ['./interviews-view.component.css']
})
@AutoUnsubscribe
export class InterviewsComponent implements OnInit {

  public interviews;

  constructor(
    private interviewService: InterviewService, 
	private router: Router
  ) { }

  ngOnInit() {
    this.getInterviews();
	//this.router.navigate(['app-home']);
  }
  viewInterview(inteview){
	  this.interviewService.setInterview(inteview);
	  this.router.navigate(['interviewDetails']);
  }
  getInterviews() {
    this.interviewService.getAllInterviews().subscribe(
     data => {
        this.interviews = data;
      }
    )
  } 


}
