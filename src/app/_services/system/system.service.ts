import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private base = 'http://localhost:5050';

  constructor(private readonly http: HttpClient) { }


}
