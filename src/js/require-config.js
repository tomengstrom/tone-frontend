requirejs.config({
	baseUrl : 'js',
	shim : {

	},
	paths: {

    'Controller':     'Controller',
    'Tone':           'Tone',
    'SoundPlayer':    'SoundPlayer',

    'ColorMapper': 		'ColorMapper',
		'ColorPicker':		'ColorPicker',

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
