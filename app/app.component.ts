import {Component} from '@angular/core';

import {HeroesComponent} from './heroes/heroes.component'
import { MapComponent } from './map/map.component';



@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <toh-heroes></toh-heroes>
    <lpd-map></lpd-map>

    `,
    directives:[HeroesComponent,MapComponent]    
})
export class AppComponent {
    lat: number = 51.678418;
  lng: number = 7.809007;
    title='Tour of Heroes';
 }
