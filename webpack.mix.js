const tadaConfig = require('./tada-config.json');
const mix = require('laravel-mix');
const path = require('path');
const { node } = require('webpack');
const root = path.resolve(__dirname);
const src = `${root}/src`;
const theme = `wp-content/themes/${tadaConfig.theme_name}/`;

const DEV_MODE = !mix.inProduction();

mix.setPublicPath('/');
mix.js(`src/scripts/scripts.js`, `${theme}/js`)
	.babel([`${theme}/js/scripts.js`], `${theme}/js/scripts.min.js`)
	.copy('src/fonts', `${theme}/fonts`)
	.options({
		postCss: [require('autoprefixer')],
		processCssUrls: false,
		terser: {
			terserOptions: {
				keep_fnames: true,
			},
		},
		cssNano: {
			calc: false,
		},
	})
	.webpackConfig({
		mode: DEV_MODE ? 'development' : 'production',
		devtool: DEV_MODE ? 'source-map' : false,
		optimization: {
			minimize: !DEV_MODE,
		},
	})
	.sourceMaps(DEV_MODE)
	.sass(`${src}/styles/critical.scss`, `${theme}`)
	.sass(`${src}/styles/editor.scss`, `${theme}`)
	.sass(`${src}/styles/style.scss`, `${theme}`)
	.browserSync({
		proxy: `http://${tadaConfig.dev_url}`,
		notify: {
			styles: {
				top: 'auto',
				bottom: '20px',
			},
		},
	})
	.disableSuccessNotifications();
