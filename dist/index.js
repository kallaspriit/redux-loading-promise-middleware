'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var isPromise = function isPromise(val) {
	return val && typeof val.then === 'function';
};

exports.default = function (_ref) {
	var dispatch = _ref.dispatch;
	return function (next) {
		return function (action) {
			if (!isPromise(action.payload)) {
				return next(action);
			}

			dispatch(_extends({}, action, {
				payload: null,
				isLoading: true,
				error: null
			}));

			return action.payload.then(function (payload) {
				return dispatch(_extends({}, action, {
					payload: payload,
					isLoading: false,
					error: null
				}));
			}, function (error) {
				return dispatch(_extends({}, action, {
					payload: null,
					isLoading: false,
					error: error
				}));
			});
		};
	};
};

var getDefaultAsyncState = exports.getDefaultAsyncState = function getDefaultAsyncState() {
	var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	return _extends({
		isLoading: false,
		error: null
	}, info);
};