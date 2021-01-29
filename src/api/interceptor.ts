import axios from 'axios';

axios.interceptors.request.use((config) => {
	config.timeout = 40 * 1000; // timeout 40s
	config.withCredentials = true;

	config.headers['Access-Control-Allow-Origin'] = '*';
	config.headers['Content-Type'] = 'application/json';
	config.headers['X-Requested-With'] = 'XMLHttpRequest';

	return config;
});

export default axios;
