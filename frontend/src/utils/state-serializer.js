import * as _ from 'lodash';


class StateSerializer {

	/**
	 * Import base classes for model comparison
	 * @param  {Object} bases Key-Value mapping of base classes
	 * @return {Void}       
	 */
	importBaseClasses(bases) {

		this.bases = bases;

	}

	/**
	 * Import classes that will be serialized
	 * @param  {Object} cls Key-Value mapping of serializable classes
	 * @return {Void}     
	 */
	importSerializables(cls) {

		this.serializables = cls;

	}

	/**
	 * Validate that this should ONLY serialize a state object
	 * @param  {BaseStore} state State object
	 * @return {Boolean}       Validation status
	 */
	validate(state) {

		let validated = state instanceof this.bases['BaseStore'];

		if (!validated) {

			console.warn("Halt! Please serialize a state object!");

		}

		return validated;

	}

	/**
	 * Serialize the state object
	 * @param  {BaseStore} state State object
	 * @return {String}       Customized state JSON
	 */
	serialize(state) {

		if (this.validate(state)) {

			return JSON.stringify(state);

		}
	}

	/**
	 * Deserialize the state object
	 * @param  {String} stateString Jsoned version of state object
	 * @return {Mixed}             State object
	 */
	deserialize(stateString) {
		
		return JSON.parse(stateString, (key, value) => {
			
			if (!value) return value;

			if (value['__serializedtype'] == "model") {

				var model = new this.serializables[value['__serializedclass']]();

				_.unset(value, '__serializedtype');
				_.unset(value, '__serializedclass');

				model.attrs = value.attrs;

				for (var tmpKey in value.tmp) {

					model[tmpKey] = value.tmp[tmpKey];

				}

				return model;
			}

			if (value['__serializedtype'] == 'state') {

				var state = new this.serializables[value['__serializedclass']]();

				_.unset(value, '__serializedtype');
				_.unset(value, '__serializedclass');

				state.store = value.store;

				for (var tmpKey in value.tmp) {

					state[tmpKey] = value.tmp[tmpKey];

				}

				return state; 

			}

			return value;

		});

	} 

}

let Serializer = new StateSerializer();

export { Serializer }
