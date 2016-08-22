export default function promiseMiddleware() {
	return (dispatch) => (action) => {
		const {
			payload,
			...rest,
		} = action;

		// check whether the payload looks like a promise
		if (payload && typeof payload.then === 'function') {
			dispatch({
				...rest,
				payload: {
					isLoading: true,
					error: null,
				},
			});

			payload.then(
				(info) => {
					dispatch({
						...rest,
						payload: {
							isLoading: false,
							error: null,
							info,
						},
					});
				},
				(error) => {
					dispatch({
						...rest,
						payload: {
							isLoading: false,
							error,
							info: null,
						},
					});
				}
			);
		} else {
			// not a promise, just pass-through
			dispatch(action);
		}
	};
}

export function getDefaultAsyncState(info = null) {
	return {
		isLoading: false,
		error: null,
		info,
	};
}
