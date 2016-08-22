'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = promiseMiddleware;
exports.getDefaultAsyncState = getDefaultAsyncState;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function promiseMiddleware() {
	return function (dispatch) {
		return function (action) {
			var payload = action.payload;

			var rest = _objectWithoutProperties(action, ['payload']);

			// check whether the payload looks like a promise


			if (payload && typeof payload.then === 'function') {
				dispatch(_extends({}, rest, {
					payload: {
						isLoading: true,
						error: null
					}
				}));

				payload.then(function (info) {
					dispatch(_extends({}, rest, {
						payload: {
							isLoading: false,
							error: null,
							info: info
						}
					}));
				}, function (error) {
					dispatch(_extends({}, rest, {
						payload: {
							isLoading: false,
							error: error,
							info: null
						}
					}));
				});
			} else {
				// not a promise, just pass-through
				dispatch(action);
			}
		};
	};
}

function getDefaultAsyncState() {
	var info = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	return {
		isLoading: false,
		error: null,
		info: info
	};
}