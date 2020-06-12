import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherReport } from '../dashboard/dashboard.component';
@Injectable()
export class DashboardService {

  constructor(private _http: Http) { }
  
  getData(city:string): Observable<WeatherReport> {
    return this._http.get('http://api.openweathermap.org/data/2.5/forecast?q='+ city+'&APPID=4fee5b2be74374d0b403af2de625845a').pipe(map((response: Response) => response.json()))

  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || ' error');
  }
}
