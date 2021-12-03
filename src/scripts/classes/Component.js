import EventEmitter from 'events';
import { each } from 'lodash';

export default class extends EventEmitter {
	constructor({ element = null, elements = null }) {
		super();
		this.element = element instanceof window.HTMLElement ? element : document.querySelector(element);
		this.elements = { ...elements };

		if (this.element === null) {
			console.warn('Cant find this.element. Is element in DOM?');
			this.element = document.querySelector('body');
		}

		each(elements, (selector, key) => {
			if (selector instanceof window.HTMLElement || selector instanceof window.NodeList) {
				this.elements[key] = selector;
			} else if (Array.isArray(selector)) {
				this.elements[key] = selector;
			} else {
				this.elements[key] = [...this.element.querySelectorAll(selector)];

				if (this.elements[key].length === 0) {
					this.elements[key] = null;
				} else if (this.elements[key].length === 1) {
					this.elements[key] = this.element.querySelector(selector);
				}
			}
		});
	}
}
