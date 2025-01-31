import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetFlowResponseInterface } from '../types/getFlowResponse.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  constructor(private http: HttpClient) {}
  getFlow(url: string): Observable<GetFlowResponseInterface> {
    const fullUrl = environment.apiUrl + url;
    return this.http.get<GetFlowResponseInterface>(fullUrl);
  }
}
