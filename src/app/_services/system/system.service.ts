import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetSystemResponse } from '../../_dto/system/system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private base = 'http://localhost:5050';

  constructor(private readonly http: HttpClient) { }

  listSystems() {
    return this.http.get<GetSystemResponse[]>(`${this.base}/system`)
  }
}
