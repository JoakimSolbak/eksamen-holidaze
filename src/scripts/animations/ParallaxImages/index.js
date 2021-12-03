import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default class ParallaxImages {
	constructor() {
		this.sections = [...document.querySelectorAll('[data-parallax-image]')];
		if (!this.sections.length) return;

		this.sections.forEach((section) => {
			const image = section.querySelector('img');
			gsap.to(image, {
				yPercent: 30,
				ease: 'none',
				scrollTrigger: {
					trigger: section,
					start: 'top bottom',
					scrub: true,
				},
			});
		});
	}
}
