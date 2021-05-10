import {albumReducer} from './albumReducer';

const initialState = {items: [], dataLoading: false, loadingComplete: false};

describe('albumReducer', () => {
	describe('get album covers', () => {
		it('with undefined state and action type should return initial state', async () => {
			const response = albumReducer(undefined,{});
			expect(response).toEqual(initialState);
		});

		it('with undefined state and action type ALBUMCOVERS_REQUEST', async () => {
			const action = {type:'ALBUMCOVERS_REQUEST'};
			const response = albumReducer(undefined,action);
			console.log(response);
			expect(response).toEqual({...initialState, dataLoading: true, loadingComplete: false});
		});

		it('with undefined state and action type ALBUMCOVERS_SUCCESS', async () => {
			const action = {type:'ALBUMCOVERS_SUCCESS'};
			const response = albumReducer({items: []},action);
			console.log(response);
			expect(response).toEqual({items: undefined, dataLoading: false, loadingComplete: true});
		});
	});
});