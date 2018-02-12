requirejs.config({
	baseUrl : 'js',
	shim : {

	},
	paths: {
		// jQuery
		'jquery': 	'lib/jquery-3.3.1.min',

		// Our modules
    'Tone':     'Tone',
		'Debug':		'utils/Debug',

		'DeferredQueue': 'DeferredQueue'
	},

	urlArgs: "cachebust=" + ( new Date() ).getTime()
} );

require( ['Tone'], function(Tone) {
	new Tone({});
} );
