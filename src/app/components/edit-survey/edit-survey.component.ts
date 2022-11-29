import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Survey } from 'src/app/models/survey.model';
import { ApiSurveyService } from 'src/app/services/apisurvey.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.css']
})
export class EditSurveyComponent implements OnInit {
  editSurveyForm = new FormGroup
  (
    {
      topic: new FormControl(""),
      description: new FormControl(""),
      questions: new FormArray([])
    }
  )
  
                      
  questions!: FormArray;
  editedSurvey!: Survey;
  originalQuestions!: {index: number,question: string}[];

  // editSurveyForm: FormGroup = new FormGroup
  // (
  //   {
  //     topic: new FormControl(this.editedSurvey.topic, Validators.required),
  //     description: new FormControl(this.editedSurvey.description, Validators.required),
  //     questions: new FormArray([])
  //   }
  // )

  constructor
  (
    private apiService: ApiSurveyService,
    private router: ActivatedRoute
  ) 
  {}

  ngOnInit(): void 
  {    
    this.apiService.getEditSurvey(this.router.snapshot.params['id'])
                    .subscribe((result) => 
                    {
                      this.editSurveyForm = new FormGroup
                      (
                        {
                          topic: new FormControl(result['topic'], Validators.required),
                          description: new FormControl(result['description'], Validators.required),
                          questions: new FormArray([])
                        }
                      )
                      this.originalQuestions = result.questions;
                      // this.originalQuestions = result.questions
                      // this.originalQuestions = result.questions;
                      // this.originalSurveyId = result.surveyId;
                      // console.log(this.originalQuestions);
                    });
     
                    
    // this.editSurveyForm = new FormGroup
    // (
    //   {
    //     topic: new FormControl(null, Validators.required),
    //     description: new FormControl(null, Validators.required),
    //     questions: new FormArray([]),
    //   }
    // );
  }

  onSubmit()
  {
    // console.log("HEY");
    // this.editedSurvey = 
    // {
    //   topic: this.editSurveyForm.value.topic,
    //   description: this.editSurveyForm.value.description,
    //   questions: this.editSurveyForm.value.questions,
    //   surveyId: this.originalSurveyId
    // }
    // console.log(this.editedSurvey);
    // this.apiService.putSurvey(this.editedSurvey);    
  }

  
  getControl()
  {
    return (<FormArray>this.editSurveyForm.get("questions")).controls;
  }

  onCancel()
  {
    this.editSurveyForm.reset();
  }

  addQuestion()
  {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.editSurveyForm.get("questions")).push(control);
  }
}
