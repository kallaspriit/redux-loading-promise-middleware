import { fetch, fetchFail } from './api';
import { FETCH_TODOS, ADD_TODO } from './constants';

export const fetchTodos = () => dispatch => dispatch({
	type: FETCH_TODOS,
	payload: fetch(),
});

export const fetchTodosFail = () => dispatch => dispatch({
	type: FETCH_TODOS,
	payload: fetchFail(),
});

export const addTodo = todo => dispatch => dispatch({
	type: ADD_TODO,
	payload: todo,
});