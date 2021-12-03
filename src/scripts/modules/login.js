// Login with JWT authentication, then create a wordpress cookie
import { baseUrl } from '../settings/api';
import { saveToken, saveUser } from '../utils/storage.js';

const loginForm = document.getElementById('login-form');
const username = document.getElementById('loginUsername');
const password = document.getElementById('loginPassword');
const errorMsgContainer = document.getElementById('lform_validation_errors');

const submitForm = (event) => {
	event.preventDefault();

	errorMsgContainer.innerHTML = '';

	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();

	if (usernameValue.length === 0 || passwordValue.length === 0) {
		errorMsgContainer.innerHTML = `<h2>Both username and password is required</h2>`;
	}
	doLogin(usernameValue, passwordValue);
};

if (loginForm) {
	loginForm.addEventListener('submit', submitForm);
}

const sendUsername = async (theName) => {
	const sendUrl = baseUrl + '/wp-json/auth/v1/auth-user?username=' + theName;

	const options = {
		method: 'POST',
		body: theName,
	};

	try {
		await fetch(sendUrl, options);
	} catch (error) {
		errorMsgContainer.innerHTML = `<h2>Error fetching data from server: ${error}</h2>`;
	}
};

const doLogin = async (username, password) => {
	const url = baseUrl + '/wp-json/jwt-auth/v1/token';

	const data = JSON.stringify({ username: username, password: password });

	const options = {
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const response = await fetch(url, options);
		const json = await response.json();

		if (json.user_display_name) {
			saveToken(json.token);
			saveUser(json.user_display_name);
			alert('Login successful.');
			sendUsername(json.user_nicename);
			setTimeout(() => {
				location.href = baseUrl + '/dashboard';
			}, 750);
		} else {
			errorMsgContainer.innerHTML = `<h2>Wrong username or password.</h2>`;
		}
	} catch (error) {
		errorMsgContainer.innerHTML = `<h2>Error fetching data from server: ${error}</h2>`;
	}
};
