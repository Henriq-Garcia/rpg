import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserPayload, UserResponse } from '../../_dto/user/create-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base = 'http://localhost:5050';

  constructor(private readonly http: HttpClient) { }

  createUser(payload: CreateUserPayload): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.base}/user`, payload);
  }

  getUser(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.base}/user/${id}`);
  }
}
