import Auth from '../../authentication/auth';

class Middleware {

	handle(to, from, next) {

		if (!Auth().user()['hasBecomeProvider']) {
			next({
				path: '/register',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	}
}

module.exports = () => {

	return new Middleware;

};