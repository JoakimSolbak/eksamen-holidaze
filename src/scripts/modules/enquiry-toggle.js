const enqToggleBtns = document.querySelectorAll('.enquiry-toggle');

if (enqToggleBtns) {
	enqToggleBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			btn.parentNode.classList.toggle('active');
		});
	});
}
