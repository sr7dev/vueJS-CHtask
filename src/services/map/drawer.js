import axios from 'axios';
import TurfAlong from '@turf/along';
import TurfLineDistance from '@turf/line-distance';

import { Pin } from '../../models/pin';
import { Direction } from '../../models/direction';
import { MapBoxGL, MapBoxAPIQuery } from './api-clients';


const http = axios;

export class MapDrawer {

	constructor() {

		this.mapbox = new MapBoxGL();

	}

	/**
	 * Bind map to dom
	 * @param  {String} containerId HTML dom id
	 * @return {MapDrawer}             this
	 */
	inside(containerId) {

		this.container = containerId;

		return this;

	}

	/**
	 * Set map style
	 * @param  {String} style Url of style scheme
	 * @return {MapDrawer}       this
	 */
	style(style) {

		this.style = style;

		return this;

	} 

	/**
	 * Draw the map on canvas
	 * @param {Boolean} control Control of the map
	 * @return {MapDrawer} this
	 */
	draw(control = true) {

		this.realMap = new this.mapbox.client.Map({

			container : this.container,

			style : this.style
			
		});

		// disable right click rotate
		// coz it brings so much error
		// for route animation
		this.realMap.dragRotate.disable();

		if (control) {

			let scaleControl = new this.mapbox.client.ScaleControl({

				maxWidth: 80,

				unit: 'imperial'

			});

			let navControl = new this.mapbox.client.NavigationControl();

			this.realMap.addControl(scaleControl);
			this.realMap.addControl(navControl);

		}

		return this;

	}
	/**
	 * Fit the map between locations {lng:,lat:}
	 * @param {Iterable} locations A bunch of Coord pairs
	 * @return {void}
	 */
	fit(locations) {

		if (locations.length == 1) {

			locations = locations.concat(locations[0]);

		}

		locations = locations.map((location) => {

			return [parseFloat(location['lng']), 
					parseFloat(location['lat'])];

		});

		


		let bounds = new this.mapbox.client.LngLatBounds();

		locations.forEach((location) => {

			bounds.extend(location);

		});

		this.realMap.fitBounds(bounds, {

			padding : 100,

			duration: 500,
			easing: function(x) {return x * x},


		});

	}

	/**
	 * Fly the map to a location
	 * @param  {Object} coords of destination
	 * @return {Void}        
	 */
	flyTo(location, zoom = 9) {

		this.realMap.flyTo({

			center : [
				parseFloat(location['lng']), 
				parseFloat(location['lat'])
			],
			duration: 500,
			easing: function(x) {return x*x*x},

			zoom : zoom

		});

	}

	/**
	 * Center the map to a coord pair
	 * @param  {Object} location Coord pair
	 * @return {void}
	 */
	center(location) {

		this.realMap.setCenter([
				parseFloat(location['lng']), 
				parseFloat(location['lat'])
			]);
	}

	/**
	 * Zoom into the map with certain scale
	 * @param  {Number} scale Num of levels
	 * @return {Void}       
	 */
	zoom(scale = 10) {

		this.realMap.zoomTo(scale);

	}

	/**
	 * Draw markers on the map
	 * @param  {Array<Marker>} markers A list of markers
	 * @return {void}    
	 */
	drawMarkers(...markers) {
		
		markers.forEach((marker) => {

			marker.addTo(this.realMap);

		});
	
	}

	/**
	 * Draw a draggable pin on map
	 * @param  {Pin} pin A pin that can be draggable
	 * @return {void}     
	 */
	drawPins(pins) {
		
		pins.forEach((pin) => {

			pin.addTo(this.realMap);

		});

	}

	/**
	 * Draw direction from A to B on the map
	 * @param  {Object} from    Origin coords
	 * @param  {Object} to      Destination coords
	 * @param  {Object} options Routing options
	 * @return {Promise} Promise<Direction>
	 */
	drawDirection(from, to, speed = 6, repeat = false, options = {}) {

		// create a pin that moves
		let car = Pin.create({
			'id' : "car_pin",
			'draggable' : false,
			'location' : from,
			'icon_url' : 'car-15'
		});

		// create a direction
		let direction = Direction.create({
			'id' : 'test_direction',
			'from' : from,
			'to' : to,
			'route_options' : options
		}).setPin(car)
		  .shouldRepeat(repeat)
		  .setSpeed(speed);

		// add direction route to map
		return direction.addTo(this.realMap);

	}

	/**
	 * Clear map resources when done
	 * @return {Void} 
	 */
	clearResources() {

		this.realMap.remove();

	}

	/**
	 * Get the real mapbox map under the hood
	 * @return {mapbox.Map} realMap
	 */
	get map() {

		return this.realMap;

	}

}