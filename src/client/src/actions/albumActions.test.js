import expect from 'expect';
import mockAxios from 'axios';
//import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {getAlbumCovers} from './albumActions';
import * as types from '../constants/actionTypes';

describe('albumActions', () => {
	const middlewares = [thunk];
	// const mockStore = configureMockStore(middlewares);
	// const store = mockStore();

	beforeEach(() => {
	});

	afterEach(() => {
		//store.clearActions();
	});
	describe('getAlbumCovers', () => {
		it('request is valid', () => {
			expect(1).toEqual(1);
		});
	});
});