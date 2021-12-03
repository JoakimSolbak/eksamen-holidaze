import Page from './Base';
import { gsap } from 'gsap';
import imagesLoaded from 'imagesloaded';

export default class Preloader extends Page {
	constructor() {
		super({
			element: '.preloader',
			elements: {
				images: [...document.querySelectorAll('img')],
				loader: '.loader',
				progress: '.progress',
			},
		});

		if (this.elements.images.length === 0) {
			this._updateLoaderValues(1);
			this._onLoaded();
			return;
		}

		this._createLoader();
	}

	_createLoader() {
		const imageLoader = imagesLoaded(this.elements.images, this._onLoaded.bind(this));

		imageLoader.on('progress', ({ progressedCount }) => {
			const loadedValue = progressedCount / this.elements.images.length;
			this._updateLoaderValues(loadedValue);
		});
	}

	_updateLoaderValues(progress) {
		const percentage = Math.round(progress * 100);
		this.elements.loader.style.transform = `scaleX(${progress})`;
		this.elements.progress.innerHTML = `${percentage}%`;
	}

	_onLoaded() {
		gsap.to(this.element, {
			yPercent: -100,
			ease: 'expo',
			duration: 1,
			delay: 1,
			onComplete: () => {
				this.emit('completed');
			},
		});
	}

	destroy() {
		this.element.parentNode.removeChild(this.element);
	}
}
