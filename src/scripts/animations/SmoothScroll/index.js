import Scrollbar from 'smooth-scrollbar';

export default () => {
	document.documentElement.classList.add('has-smooth-scroll');

	Scrollbar.init(document.querySelector('#main-wrapper'), {
		damping: 0.1,
		continuousScrolling: true,
	});
};
