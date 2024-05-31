import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User, UserResponse } from "../interfaces/Auth";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient){}
  login(user: User): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, user)
  }
  register(user: User): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/register`, user)
  }
}