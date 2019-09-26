import { Tokens, Urls } from '../constants';

export class MapBoxGL {

	constructor() {

		mapboxgl.accessToken = Tokens.MAPBOX_API_KEY;

	}

	get client() {

		return mapboxgl;

	}

}

export class MapBoxClient {

	constructor() {

		this.client = new mapbox(Tokens.MAPBOX_API_KEY);

	}

	get client() {

		return this.client;

	}

}

export class MapBoxAPIQuery {

	constructor() {

		this.requestUrl = Urls.MAPBOX_API_BASE_URL;

	}

	/**
	 * Compose api query to get direction
	 * @param  {Object} from Coord pairs
	 * @param  {Object} to   Coord pairs
	 * @param {String} options Extra options
	 * @return {MapBoxAPIQuery}      this
	 */
	direction(from, to, options = {}) {

		// normalize options
		if (!options['mode']) {

			options['mode'] = 'driving';

		}

		if (!options['steps']) {

			options['steps'] = "true";

		}

		if (!options['geometries']) {

			options['geometries'] = "geojson";

		}

		// generate url
		this.appendPath('directions')
			.appendPath('v5')
			.appendPath('mapbox')
			.appendPath(options['mode'])
			.appendPath(`${from['lng']},${from['lat']};${to['lng']},${to['lat']}.json`);

		delete options['mode'];

		Object.keys(options).forEach((key) => {

			this.appendQuery(key, options[key]);

		});

		this.appendQuery('access_token', Tokens.MAPBOX_API_KEY);

		return this;
	}

	/**
	 * Reset the request url
	 * @return {void} 
	 */
	clear() {

		this.requestUrl = Urls.MAPBOX_API_BASE_URL;

	}

	/**
	 * Get the final query url
	 * @return {String} request url
	 */
	get query() {

		return this.requestUrl;

	}

	/**
	 * Append a path to the base url e.g. /direction
	 * @param  {String} path Name of new path
	 * @return {MapBoxAPIQuery} this
	 */
	appendPath(path) {

		this.requestUrl += `/${path}`;

		return this;

	}

	/**
	 * Append a query parameter to the base url e.g. /?key=value
	 * @param  {String} key   Name of the query key
	 * @param  {String} value Content of the query value
	 * @return {MapBoxAPIQuery}       this
	 */
	appendQuery(key, value) {

		if (this.requestUrl.indexOf('?') != -1) {

			// it is not the first param
			this.requestUrl += `&${key}=${value}`;

		} else {

			// it is the first param
			this.requestUrl += `?${key}=${value}`;

		}

		return this;
	}

}