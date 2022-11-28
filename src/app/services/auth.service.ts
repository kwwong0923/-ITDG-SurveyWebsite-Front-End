import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders(
      {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3201/api/";
    
    constructor
    (
        private http: HttpClient
    ){}

    public isAuthenticated(): Boolean
    {
        let userData = localStorage.getItem("userInfo");

        if(userData && JSON.parse(userData))
        {
            return true;
        }

        return false;
    }

    public setUserInfo(user: any)
    {
        localStorage.setItem("useInfo", JSON.stringify(user));
    }

    clearStorage()
    {
        localStorage.clear();
    }

    public validate(username: string, password: string)
    {
        return this.http.post(this.url + "auth/login",{"username": username, "password": password}, httpOptions);
    }

    public signupUser(newUser: User)
    {
        return this.http.post(this.url + "auth/signup", httpOptions);
    }

    public getUserInfo(): Observable<User> {
        return this.http.get<User>(this.url + "auth/getUser", httpOptions)
      }
}
