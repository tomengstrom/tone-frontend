requirejs.config({
	baseUrl : 'js',
	shim : {

	},
	paths: {

    'Controller':     'Controller',
    'Tone':           'Tone',
    'SoundPlayer':    'SoundPlayer',

		'_View':					'_View',

    'ColorMapper': 		'ColorMapper',
		'ColorPicker':		'ColorPicker',
		'Intro':					'Intro',

    // Libs
    'jquery':         'lib/jquery-3.3.1.min',

    // Utilities
		'Debug':		    'utils/Debug'
	},

	urlArgs: "cachebust=" + ( new Date() ).getTime()
} );

require( ['Tone'], function(Tone) {
	new Tone({});
} );
