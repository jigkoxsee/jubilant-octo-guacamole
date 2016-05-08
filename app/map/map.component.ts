import { Component, OnInit, ViewChild, Renderer,ElementRef} from '@angular/core';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'lpd-map',
    templateUrl: 'map.component.html',
    styles: [`
    #map {
      height: 300px;
    }
  `]
})
export class MapComponent implements OnInit {
    myMap: any;
    @ViewChild('map') divMap: ElementRef;

    constructor(public renderer: Renderer) { }

    ngOnInit() {

    }

    ngAfterViewInit() {
        console.log(this.divMap.nativeElement);
        this.myMap= new google.maps.Map(this.divMap.nativeElement, { center: {lat: -34.397, lng: 150.644}, scrollwheel: false, zoom: 8 });
    }

}