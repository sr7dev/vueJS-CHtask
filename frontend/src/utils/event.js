import Vue from 'vue'

class EventBus {

	constructor() {
		this.bus = new Vue();
	}

	/**
	 * Singleton constructor
	 * @return {Auth} this
	 */
	static d(){

		return this.instance ? this.instance : this.instance = new EventBus;

	}

	/**
	 * Subscribe to an event
	 * @param  {String}   event    Name of event
	 * @param  {Function} callback Callback when event happened
	 * @return {Void}            
	 */
	subscribe(event, callback) {

		this.bus.$on(event, callback);

	}

	/**
	 * Subscribe to an event only once
	 * @param  {String}   event    Name of event
	 * @param  {Function} callback Callback when event happened
	 * @return {Void}            
	 */
	subscribeOnce(event, callback) {

		this.bus.$once(event, callback);

	}

	/**
	 * Publish a new event with optional data
	 * @param  {String} event Name of event
	 * @param  {Object} data  Data to be passed
	 * @return {Void}       
	 */
	publish(event, data = {}) {

		this.bus.$emit(event, data);

	}

	/**
	 * Unsubcribe all listeners for a particular event
	 * @param  {String} event Name of event
	 * @return {Void}       
	 */
	unsubscribe(event) {

		this.bus.$off(event);

	}

}

export default () => {

	return EventBus.d();

}