import Request from '../api/request';

export class GeoCoder {

	/**
	 * Encode an address into coordinates
	 * @param  {String} address Name of address
	 * @return {Promise}         Response promise
	 */
	static encode(address) {

		return Request().get('location/search', {
						'option' : 'forward',
						'keyword' : address
					}).then(
						success => {
							return Promise.resolve(success);
						},
						error => {
							
							// return error
							return Promise.reject(error);

						}
					);

	}

	/**
	 * Decode a coordinate pairs into address
	 * @param  {Object} coords Coord pairs
	 * @return {Promise}        Response promise
	 */
	static decode(coords) {

		return Request().get('location/search', {
						'lat' : coords['lat'],
						'lon' : coords['lng'],
						'option' : 'reverse'
					}).then(
						success => {
							// get data
							var data = success['data'];
							// post process address
							var address = data['address'].toString();
							address = address.replace(data['country'], "")
							address = address.replace(data['state'], "")
							address = address.replace(data['zip_code']+',', "")
							address = address.replace(data['city']+',')
							address = address.substring(0, address.lastIndexOf(','));
							data['address'] = address;
							success['data'] = data;
							// return the data
							return Promise.resolve(success);
						},
						error => {
							return Promise.reject(error);
						}
					)

	}

}