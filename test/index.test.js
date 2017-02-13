import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from '../src/index';
import * as actions from '../examples/actions';
import * as constants from '../examples/constants';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureMockStore(middlewares);

describe('redux-loading-promise-middleware', () => {
	it('should call sync function once', () => {
		const store = mockStore({});

		const expectedActions = [{
			type: constants.ADD_TODO,
			payload: 'test',
		}];

		store.dispatch(actions.addTodo('test'));

		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should call async action twice', async () => {
		const store = mockStore({});

		const expectedActions = [{
			type: constants.FETCH_TODOS,
			payload: null,
			isLoading: true,
			error: null,
		}, {
			type: constants.FETCH_TODOS,
			payload: ['get milk', 'buy new car'],
			isLoading: false,
			error: null,
		}];

		await store.dispatch(actions.fetchTodos());

		expect(store.getActions()).toEqual(expectedActions);
	});

	it('should show error if promise was rejected', async () => {
		const store = mockStore({});

		const expectedActions = [{
			type: constants.FETCH_TODOS,
			payload: null,
			isLoading: true,
			error: null,
		}, {
			type: constants.FETCH_TODOS,
			payload: null,
			isLoading: false,
			error: 'Fetch failed',
		}];

		await store.dispatch(actions.fetchTodosFail());

		expect(store.getActions()).toEqual(expectedActions);
	});
});
