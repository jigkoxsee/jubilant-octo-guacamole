import { Component, OnInit, ViewChild, Renderer, ElementRef} from '@angular/core';
import { MapService } from './map.service';
declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'lpd-map',
    templateUrl: 'map.component.html',
    styles: [`
    #map {
      height: 300px;
    }
  `],
  providers:[MapService]
})
export class MapComponent implements OnInit {
    myMap: any;
    @ViewChild('map') divMap: ElementRef;
    
    direction :any;
    

    constructor(public renderer: Renderer, private mapService: MapService) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        console.log(this.mapService.getDirection().subscribe(dir => this.direction = dir));
        console.log(this.direction);
        /*
          this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
         */
        console.log(this.divMap.nativeElement);
        this.myMap = new google.maps.Map(this.divMap.nativeElement, { center: { lat: -34.397, lng: 150.644 }, scrollwheel: false, zoom: 8 });
    }

}