export default class Observer {
	constructor(elements, visibility, callback) {
		if (!elements.length) return;

		if (Array.isArray(elements)) {
			this.elements = elements;
		} else if (typeof elements === 'string') {
			this.elements = [...document.querySelectorAll(elements)];
		}
		this.callback = callback;
		this.options = {
			root: null,
			rootMargin: '0px',
			threshold: visibility || 0.5,
		};

		this._createObserver();
		this._watchElements();
	}

	_createObserver() {
		this.observer = new IntersectionObserver((entries) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					this.callback(entry.target, index);
					this.observer.unobserve(entry.target);
				}
			});
		}, this.options);
	}

	_watchElements() {
		this.elements.forEach((element) => {
			this.observer.observe(element);
		});
	}
}
