// Render subscriber/normal user dashboard
const adminNavMenu = document.getElementById('dashboard-links');

// Admin profile links
const enquiriesBtn = document.getElementById('enquiries-btn');

// Contact links
const contactLinks = document.getElementById('contact-links');
const establishmentEnqBtn = document.getElementById('establishment-enq-btn');
const holidazeEnqBtn = document.getElementById('holidaze-enq-btn');

// Interfaces
const dashboardContent = document.getElementById('dashboard-content');

const establishmentEnqInterface = document.getElementById('establishment-enquiries-interface');
const holidazeEnqInterface = document.getElementById('holidaze-enquiries-interface');

// Functions
function showContactLinks() {
	dashboardContent.classList.add('visually-hidden');
	enquiriesBtn.classList.add('active-dashboard-tablink');
	contactLinks.classList.remove('visually-hidden');
	establishmentEnqBtn.classList.remove('active-dashboard-tablink');
	holidazeEnqBtn.classList.remove('active-dashboard-tablink');

	newEstablishmentInterface.classList.add('visually-hidden');
}

function showEstablishmentEnqInterface() {
	holidazeEnqBtn.classList.remove('active-dashboard-tablink');
	establishmentEnqBtn.classList.add('active-dashboard-tablink');

	establishmentEnqInterface.classList.remove('visually-hidden');
	holidazeEnqInterface.classList.add('visually-hidden');
	dashboardContent.classList.remove('visually-hidden');
}

function showHolidazeEnqInterface() {
	establishmentEnqBtn.classList.remove('active-dashboard-tablink');
	holidazeEnqBtn.classList.add('active-dashboard-tablink');

	establishmentEnqInterface.classList.add('visually-hidden');
	holidazeEnqInterface.classList.remove('visually-hidden');
	dashboardContent.classList.remove('visually-hidden');
}

// Eventlisteners
if (enquiriesBtn) {
	enquiriesBtn.addEventListener('click', showContactLinks);
}

if (establishmentEnqBtn) {
	establishmentEnqBtn.addEventListener('click', showEstablishmentEnqInterface);
}

if (holidazeEnqBtn) {
	holidazeEnqBtn.addEventListener('click', showHolidazeEnqInterface);
}
