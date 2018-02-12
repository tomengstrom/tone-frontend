define(
	[],
	function() {
		var Debug;
		Debug = {

			__isDisabled: false,

			__disable: function() {
				this.__isDisabled = true;
			},

			__isScopeEnabled: {},

			isScopeEnabled: function(scope) {
				return this.__isScopeEnabled[scope];
			},

			enableScope: function(scope) {
				this.__isScopeEnabled[scope] = true;
				return;
			},
			disableScope: function(scope) {
				this.__isScopeEnabled[scope] = false;
				return;
			},

			__log: function( message, object ) {
				if(this.__isDisabled) return;
				console.log(message);
				if ( object ) {
					console.log(object);
				}
				return;
			},

			warn: function(message, object) {
				this.log( Debug.SCOPE_WARN, message, object );
			},
			error: function(message, object) {
				this.log( Debug.SCOPE_ERROR, message, object );
			},

			fatal: function(message, object) {
				this.error(message, object);
				throw (message);
			},

			// Basic togglable console debugger
			log: function( scope, message, object ) {
				var self = this;
				if ( !self.__isScopeEnabled[scope] ) return;
				return self.__log( scope + ':: ' + message, object);
			}
		};
		Debug.SCOPE_WARN = 'WARNING';
		Debug.SCOPE_ERROR = 'ERROR';

		Debug.enableScope(Debug.SCOPE_WARN);
		Debug.enableScope(Debug.SCOPE_ERROR);

//		Debug.__disable();

		return Debug;
} );
