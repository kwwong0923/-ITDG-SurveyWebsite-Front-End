import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Survey } from 'src/app/models/survey.model';
@Component({
  selector: 'app-survey-item',
  templateUrl: './survey-item.component.html',
  styleUrls: ['./survey-item.component.css']
})
export class SurveyItemComponent implements OnInit {

  @Input() survey!: Survey;

  @Output() onDeleteSurvey = new EventEmitter<Survey>();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(survey: Survey)
  {
    console.log("survey-item");
    console.log(survey);
    this.onDeleteSurvey.emit(survey);
  }
}
