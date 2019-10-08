import * as _ from 'lodash';

export class BaseModel {

	constructor() {

		this.attrs = {};

	}

	/**
	 * Standard interface for creating a model
	 * @param  {Object} Data to fill
	 * @return {Mixed}
	 */
	static create(data) {}

	/**
	 * Take the constructor data and load into model
	 * @param  {Object} data Data to fill
	 * @return {Mixed} this
	 */
	fill(data) {

		for (var key in data) {
			
			if (this.fillables.includes(key.split('.')[0])) {
					
				this.setAttr(key, data[key]);
				
			}
			
		}

		return this;
	}

	/**
	 * Set an attribute for this model
	 * @param {String} key   Name of this attribute
	 * @param {Mixed} value Value of this attibute
	 * @return this
	 */
	setAttr(key, value) {

		_.set(this.attrs, key, value);

		return this;

	}

	/**
	 * Get an attribute for this model
	 * @param  {String} key Name of this attributes
	 * @return {Mixed}     Value of this attribute
	 */
	getAttr(key) {

		return _.get(this.attrs, key);

	}

	/**
	 * Overloads JSON.Stringify behaviour
	 * @return {Object} Objects then to be stringified
	 */
	toJSON() {

		var obj = {
			attrs : this.attrs,
			tmp : {

			}
		};

		// check for tmp variables associated
		for (var key in this) {

			if (key != 'attrs') {

				obj['tmp'][key] = this[key];

			}

		}

		obj['__serializedtype'] = "model";
		obj['__serializedclass'] = this.className;

		return obj;

	}
}