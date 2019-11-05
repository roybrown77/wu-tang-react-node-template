import expect from 'expect';
import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {albumActions} from './albumActions';
import {albumActionTypes} from '../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('albumActions', () => {
	const store = mockStore();

	beforeEach(() => {
	});

	afterEach(() => {
		store.clearActions();
	});
	describe('getAlbumCovers', () => {
		it('request is valid', async () => {
			mockAxios.get.mockImplementationOnce(()=>
				Promise.resolve({data:[]})
			);

			const query = 'fake-query';
			const fields = [];

			await store.dispatch(albumActions.getAlbumCovers(query, fields));

			const actions = store.getActions();

			console.log('actions: ' + JSON.stringify(actions));

			expect(actions.find(x=>x.type===albumActionTypes.ALBUMCOVERS_REQUEST)).toBeTruthy();
		});
	});
});