import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TripService {
  dir :any;
  constructor(private http: Http) { }

  getDirection() {
    return this.http.get('app/trip.json').map((res:Response) => res.json());
  }
  
}
