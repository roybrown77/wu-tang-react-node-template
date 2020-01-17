import {albumReducer} from './albumReducer';
//import {albumActionTypes} from '../constants/actionTypes';

const initialState = {items: [], dataLoading: false};

describe('albumReducer', () => {
	describe('get album covers', () => {
		it('with undefined state and action type should return initial state', async () => {
//			const action = {type:'ALBUMCOVERS_REQUEST'};
			const response = albumReducer(undefined,{});
			expect(response).toEqual(initialState);
		});

		it('with undefined state and action type ALBUMCOVERS_REQUEST', async () => {
			const action = {type:'ALBUMCOVERS_REQUEST'};
			const response = albumReducer(undefined,action);
			console.log(response);
			expect(response).toEqual({...initialState, dataLoading: true});
		});
	});
});