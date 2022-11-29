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
  // editSurveyForm = new FormGroup
  // (
  //   {
  //     topic: new FormControl(""),
  //     description: new FormControl(""),
  //     questions: new FormArray([])
  //   }
  // )
  editSurveyForm!: FormGroup;          
  questions!: FormArray;
  editedSurvey!: Survey;
  originalQuestions!: [];
  originalSurveyId!: string;
  i: number = 0;
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

                      this.originalSurveyId = result.surveyId;
                    });  

    // for(this.i = 0; this.i < this.originalQuestions.length; this.i++)
    // {
    //   const control = new FormControl(this.originalQuestions[this.i], Validators.required);
    //   (<FormArray>this.editSurveyForm.get("questions")).push(control, this.i);
    // }

  };

  getControl()
  {
     for(this.i = 0; this.i < this.originalQuestions.length; this.i++)
    {
      const control = new FormControl(null, Validators.required);
      (<FormArray>this.editSurveyForm.get("questions")).push(control);
    }

    return this.originalQuestions;
  }
  onSubmit()
  {
    console.log("HEY");
    this.editedSurvey = 
    {
      topic: this.editSurveyForm.value.topic,
      description: this.editSurveyForm.value.description,
      questions: this.editSurveyForm.value.questions,
      surveyId: this.originalSurveyId
    }
    console.log(this.editedSurvey);
    this.apiService.putSurvey(this.editedSurvey);    
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
