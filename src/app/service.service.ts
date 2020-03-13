import { environment } from './../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-host': `${environment.apiHost}`,
        'x-rapidapi-key': `${environment.apiKey}`
      })
    };
  }

  getCasesByCountry() {
    return this.http.get<any>('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', this.httpOptions);
  }
  getTotalStats() {
    return this.http.get<any>('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php', this.httpOptions);
  }
}
