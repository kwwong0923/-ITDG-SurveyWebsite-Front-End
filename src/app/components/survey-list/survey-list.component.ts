import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
import { ApiSurveyService } from 'src/app/services/apisurvey.service';
@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  surveys: Survey[] = [];
  constructor
  (
    private apiService: ApiSurveyService
  ) { }

  ngOnInit(): void 
  {
    this.apiService
      .getSurveys()
      .subscribe((surveys)=> this.surveys = surveys);
      console.log(this.surveys);
  }

  deleteSurvey(survey: Survey)
  {
    console.log("survey-list");
    console.log(survey);
    this.apiService.deleteSurvey(survey)
                      .subscribe(() => 
                      {
                        this.surveys = this.surveys.filter((s) => s.surveyId !== survey.surveyId)
                      });
  }

  editSurvey(survey: Survey)
  {
  }
}
