import Auth from '../../authentication/auth';

class Middleware {
	handle(to, from, next) {
		if (to.matched.some(record => record.meta.auth)) {
			if (!Auth().check()) {
				next({
					path: '/sign-in',
					query: { redirect: to.fullPath }
				})
			} else {
				next();
			}
		} else {
			next();
		}
	}
}

module.exports = () => {
	return new Middleware;
};
