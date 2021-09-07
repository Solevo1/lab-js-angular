import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public get<T>(url: string, headers?: any): Observable<T> {
    return this.httpClient.get<T>(url,{headers});
  }
  public post<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.httpClient.post<T>(url, body, {headers});
  }
  public patch<T>(url: string, body: any, headers?: any): Observable<T> {
    return this.httpClient.patch<T>(url, body, {headers});
  }
}
