import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserPayload, UserResponse } from '../../_dto/user/create-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base = 'https://rpg-api-7ouf.onrender.com';

  constructor(private readonly http: HttpClient) { }

  createUser(payload: CreateUserPayload): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.base}/user`, payload);
  }

  getUser(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.base}/user/${id}`);
  }
}
