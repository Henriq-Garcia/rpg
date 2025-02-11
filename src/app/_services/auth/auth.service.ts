import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefreshTokenResponse, SignInPayload, SignInResponse } from '../../_dto/auth/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base = 'http://localhost:5050';

  constructor(private readonly http: HttpClient) { }

  signIn(payload: SignInPayload): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.base}/auth/signin`, payload);
  }

  refresh(refreshToken: string): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(`${this.base}/auth/refresh`, {}, { 
      headers: { 
        'x-refresh-token': refreshToken 
      } 
    });
  }
}
