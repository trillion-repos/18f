'use strict';

module.exports = {
	app: {
		title: 'cafs',
		description: 'cafs',
		keywords: 'cafs'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	},
	openFDAKey: [
		'fFsuBHHNsIWx1Kf4NUKuNGl5pcLijXeCqCvhVM9I'
	],
	  states: {
		  	"al": "alabama",
		    "ak": "alaska",
		    "az": "arizona",
		    "ar": "arkansas",
		    "ca": "california",
		    "co": "colorado",
		    "ct": "connecticut",
		    "de": "delaware",
		    "dc": "district of columbia",
		    "fl": "florida",
		    "ga": "georgia",
		    "hi": "hawaii",
		    "id": "idaho",
		    "il": "illinois",
		    "in": "indiana",
		    "ia": "iowa",
		    "ks": "kansas",
		    "ky": "kentucky",
		    "la": "louisiana",
		    "me": "maine",
		    "md": "maryland",
		    "ma": "massachusetts",
		    "mi": "michigan",
		    "mn": "minnesota",
		    "ms": "mississippi",
		    "mo": "missouri",
		    "mt": "montana",
		    "ne": "nebraska",
		    "nv": "nevada",
		    "nh": "new hampshire",
		    "nj": "new jersey",
		    "nm": "new mexico",
		    "ny": "new york",
		    "nc": "north carolina",
		    "nd": "north dakota",
		    "oh": "ohio",
		    "ok": "oklahoma",
		    "or": "oregon",
		    "pa": "pennsylvania",
		    "ri": "rhode island",
		    "sc": "south carolina",
		    "sd": "south dakota",
		    "tn": "tennessee",
		    "tx": "texas",
		    "ut": "utah",
		    "vt": "vermont",
		    "va": "virginia",
		    "wa": "washington",
		    "wv": "west virginia",
		    "wi": "wisconsin",
		    "wy": "wyoming"/*,
		    "u.s.":"nationwide"*/
		}
};
