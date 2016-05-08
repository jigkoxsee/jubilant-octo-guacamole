import {Component} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {MapComponent} from './map/map.component';


@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <alert type="info">Hello from ng2-bootstrap  {{ date.toDateString() }}</alert>
    <div *ngFor="let place of trip">{{place.place}}</div>
    <lpd-map></lpd-map>
    `,
  directives: [MapComponent, AlertComponent],
})
export class AppComponent {
  date: Date = new Date();
  title = 'ลองแพลนดู';
  trip: any[];
 
    
}
