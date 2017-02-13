# Redux loading promise middleware
**Middleware for Redux that turns promises into several dispatches of loading, success and error states.**

It is useful for getting asynchronous data (eg. API calls) into your redux store.
Works well together with [redux-actions](https://github.com/acdlite/redux-actions) and is inspired by [redux-promise](https://github.com/acdlite/redux-promise]).

It is similar to [FSA](https://github.com/acdlite/flux-standard-action) pattern but has some differences:
* it dispatch async actions twice: when Promise is started and when promise is finished
* it has `isLoading` param that can be checked if promise is finished
* when Promise is rejected, `error` param

## Installation

This package is distributed via npm.

```
npm install redux-loading-promise-middleware
```

## Example usage
```javascript
// store.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-loading-promise-middleware';
import reducer from './reducer';

const middlewares = compose(
	applyMiddleware(thunkMiddleware),
	applyMiddleware(promiseMiddleware)
);

return createStore(combineReducers({ reducer }), null, middlewares);
```

```javascript
// reducer.js
const initialState = {
	todos: [],
	isLoading: false,
	error: null,
};

export default function todos(state = initialState, action) {
	switch (action.type) {
		case 'FETCH_TODOS': {
			return {
				isLoading: action.isLoading, // first time true, second time false
				error: action.error, // valule from rejected promise
				todos: Array.isArray(action.payload) ? action.payload : [], // null or result from successful promise
			};
		}

		default:
			return state;
	}
}
```


```javascript
// action.js
export const fetchTodos = () => dispatch => dispatch({
	type: 'FETCH_TODOS',
	payload: fetch('/api/todos'),
});
```