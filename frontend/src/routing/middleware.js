import config from './middlewares/config';
import Auth from '../authentication/auth';

export class Middleware {

	constructor() {
		this.middlewares = config;
	}

	loadGlobal(router) {
		let handlers = [];
		for (var alias in this.middlewares.global) {
			let middleware = require("./middlewares/" + this.middlewares.global[alias])();
			handlers.push(middleware.handle);
		}
		
		router.beforeEach((to, from, next) => {
			handlers.forEach((handle) => {
				handle(to, from, next);
			});
		});
	}

	loadLocal(alias) {
		let middleware = require("./middlewares/" + this.middlewares.local[alias])();
		return middleware.handle;
	}
}