import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default class TextReveal {
	constructor() {
		this.target = [...document.querySelectorAll('[data-text-reveal]')];
		this.tl = gsap.timeline();
		this._split();
		this._setInitialStyles();

		//return this.tl;
	}

	_split() {
		this.childSplit = new SplitText(this.target, {
			type: 'lines',
			linesClass: 'text-reveal-child',
		});

		this.parentSplit = new SplitText(this.target, {
			type: 'lines',
			linesClass: 'text-reveal-parent',
		});
	}

	_setInitialStyles() {
		gsap.set(this.childSplit.lines, { yPercent: 100 });
		gsap.set(this.target, { autoAlpha: 1 });
	}

	get reveal() {
		return {
			duration: 1.5,
			yPercent: 0,
			ease: 'power4',
			stagger: 0.1,
		};
	}

	get stagger() {
		return {
			duration: 1.5,
			yPercent: 0,
			ease: 'power4',
			stagger: 0.5,
		};
	}
}
