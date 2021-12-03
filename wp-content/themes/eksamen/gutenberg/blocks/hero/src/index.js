/* eslint-disable  */
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, ButtonBlock } = wp.blockEditor;
const { PanelBody, RadioControl } = wp.components;

registerBlockType('example/hero', {
	title: 'Toppseksjon',
	description: 'Toppseksjon med eller uten illustrasjon',
	icon: 'analytics',
	category: 'layout',
	attributes: {
		title: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
			default: '#d1feac',
		},
		illustration: {
			type: 'string',
		},
		linkText: {
			type: 'string',
		},
		linkUrl: {
			type: 'string',
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const { title, backgroundColor, illustration, linkText } = attributes;

		const updateTitle = (title) => {
			setAttributes({ title });
		};

		const updateLinkText = (linkText) => {
			setAttributes({ linkText });
		};

		const updateBackground = (color) => {
			setAttributes({ backgroundColor: color });
		};

		const setIllustration = (illustration) => {
			setAttributes({ illustration: illustration });
		};

		return (
			<div>
				<InspectorControls style={{ marginBottom: '40px' }}>
					<PanelBody title={'Bakgrunnsfarge'}>
						<p>Velg en farge:</p>
						<ColorPalette value={backgroundColor} onChange={updateBackground} />
					</PanelBody>
					<PanelBody title={'Illustrasjon'}>
						<p>Denne illustrasjonen vises kun på live side.</p>
						<RadioControl
							label={'Velg illustrasjon:'}
							value={illustration}
							onChange={setIllustration}
							options={[
								{ value: 'hero_boat_and_trees', label: 'Trær og båt' },
								{ value: 'hero_bird', label: 'Fugler' },
								{ value: 'flag', label: 'Fjell med norgesflagg' },
							]}
						/>
					</PanelBody>
				</InspectorControls>
				<section className="hero" style={{ backgroundColor }}>
					<div className="hero__content">
						<RichText
							key="editable"
							tagName="h1"
							placeholder="Tittel"
							value={title}
							className="hero__title"
							onChange={updateTitle}
						/>
						<RichText
							tagName="a"
							placeholder="Tekst på knapp"
							className="btn btn--green"
							onChange={updateLinkText}
							value={attributes.linkText}
						/>
					</div>
					<div className="hero__svg" data-icon={illustration}></div>
				</section>
			</div>
		);
	},
	save: () => {
		return null;
	},
});
