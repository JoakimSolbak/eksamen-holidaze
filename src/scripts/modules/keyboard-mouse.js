// Add and remove classes from the HTML element based on user input
const htmlEl = document.querySelector('html');

// Keyboard
document.addEventListener('keydown', (e) => {
	if (e.key === 'Tab') {
		htmlEl.classList.add('user-is-tabbing');
		htmlEl.classList.remove('user-is-clicking');
	}
});

// Mouse
document.addEventListener('mousedown', () => {
	htmlEl.classList.add('user-is-clicking');
	htmlEl.classList.remove('user-is-tabbing');
});
