import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Survey } from '../models/survey.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiSurveyService {
  private url = "http://localhost:3201/api/";

  constructor
  (
    private http: HttpClient
  ) { }

  getSurveys(): Observable<Survey[]>
  {
    console.log("getSurveys");
    return this.http.get<Survey[]>(this.url + "get-surveys");
  }
  
  getEditSurvey(id: string): Observable<Survey>
  {
    return this.http.get<Survey>(this.url + "get-survey/" + id);
  }

  postSurvey(newSurvey: Survey)
  {
    this.http.post(this.url + "post-survey", newSurvey, httpOptions)
              .subscribe((res)=>
              {
                console.log(res);
              });    
  }

  putSurvey(editedSurvey: Survey)
  {
    return this.http.put<Survey>(this.url + "edit-survey/" + editedSurvey.surveyId, editedSurvey);
  }

  deleteSurvey(survey: Survey): Observable<Survey>
  {
    return this.http.delete<Survey>(this.url  + "delete-survey/" + survey.surveyId );
  }

}
