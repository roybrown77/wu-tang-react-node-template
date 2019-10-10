export default {
	get: jest.fn(()=>Promise.resolve({data:{}})),
	post: jest.fn(()=>Promise.resolve({data:{}})),
	interceptors: {
		request: {
			use: jest.fn(()=>Promise.resolve({data:{}})),
		},
		response: {
			use: jest.fn(()=>Promise.resolve({data:{}})),
		}
	}
};