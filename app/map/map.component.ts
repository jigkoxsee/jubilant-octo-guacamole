import { Component, OnInit, ViewChild, Renderer, ElementRef} from '@angular/core';
import { TripService } from '../trip/trip.service';

declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'lpd-map',
  templateUrl: 'map.component.html',
  styles: [`
    #map {
      height: 500px;
    }
  `],
  providers: [TripService]

})
export class MapComponent implements OnInit {
  @ViewChild('map') divMap: ElementRef;
  map: any;
  marker: any;
  places: any[];

  constructor(public renderer: Renderer, private tripService: TripService) {
    this.marker = [];
    this.places = [];
  }

  ngOnInit() {
    this.tripService.getDirection().subscribe(
      data => {
        data.forEach((element: any) => {
          this.geocodePlaceId(element)
        });
      }
    );
  }

  ngAfterViewInit() {
    console.log(this.divMap.nativeElement);
    this.map = new google.maps.Map(this.divMap.nativeElement, { center: { lat: 8.9724831, lng: 98.803516 }, scrollwheel: true, zoom: 8 });
  }

  addMarker(direction: any) {
    let steps = direction["routes"][0]["legs"][0]["steps"];
    for (let i = 0; i < 8; i++) {
      let lat = steps[i]["start_location"]["lat"];
      let lng = steps[i]["start_location"]["lng"];
      let instruct = steps[i]["html_instructions"];
      let latlng = new google.maps.LatLng(lat, lng);
      let marker = new google.maps.Marker({
        position: latlng,
        title: instruct
      });
      // To add the marker to the map, call setMap();
      marker.setMap(this.map);
      this.marker.push(marker);
    }
  }

  // This function is called when the user clicks the UI button requesting a reverse geocode.
  geocodePlaceId(place: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'placeId': place.placeid }, (results: any, status: any) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          let latlng = results[0].geometry.location
          let marker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location
          });
          this.marker.push(marker);
          this.places.push({
            place: place.place,
            placeid: place.placeid,
            latlng: latlng
          });
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  calculateAndDisplayRoute(start: any, destination: any) {
    let directionsService = new google.maps.DirectionsService;
    directionsService.route({
      origin: start,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log("DIR");
        console.log(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

}