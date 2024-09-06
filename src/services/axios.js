

const { API_URL } = require('@/config.json')
import axios from 'axios'
// import { history } from '../index.js'
// import { userService } from './user'
// import { jwtService } from './jwt'

// DEBUG ONLY:
// localStorage.removeItem('token');
// localStorage.removeItem('contracts');
// localStorage.removeItem('selectedContract');
// localStorage.removeItem('name');
// localStorage.removeItem('firstName');
axios.defaults.timeout = 400000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZGV2LmFwaS5sdW1pL2F1dGgvbG9naW4iLCJpYXQiOjE3MjU2NTUxMTQsImV4cCI6MTcyNTY1ODcxNCwibmJmIjoxNzI1NjU1MTE0LCJqdGkiOiJ6U3hEUjlsQlc2WUtQbGs4Iiwic3ViIjoiMTAiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.MvCilnUxrIO8TFkQD5EbXmk6LPWurbVCNyP-HXo6JvU'

// axios.refreshToken = () => {
// 	axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : (localStorage.getItem('tempToken') ? 'Bearer ' + localStorage.getItem('tempToken') : '')
// }

// axios.generateTempToken = async () => {
// 	const now = parseInt(new Date().getTime() / 1000);

// 	const tempToken = localStorage.getItem('tempToken')

// 	let tempTokenData

// 	if (tempToken)
// 		tempTokenData = jwtService.decode(tempToken)

// 	if (!tempToken || now > tempTokenData.payload.exp) {
// 		const response = await axios.get('/user/temptoken')

// 		if (!response)
// 			return false;

// 		localStorage.setItem('tempToken', response.data.token);
// 	}

// 	axios.refreshToken()
// }

// axios.refreshToken()

axios.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
	return response;
}, error => {
	if (!error.response) {
		// Handle API Offline Error
	}
	else if (error.response.status === 401) {
		// userService.logout();
		// history.push('/login');
		// location.reload();
	}
	return error;
})

export default axios