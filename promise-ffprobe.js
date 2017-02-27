/**
 * 02-27-2017
 * Generate json data about a media file using ffprobe. Assumes you already have ffprobe installed..
 * ~~ Scott Johnson
 */


/** List jshint ignore directives here. **/
/* jshint undef: true, unused: true */
/* jslint node: true */
/* global JSON:false */

var path = require( 'path' );
var Q = require( 'q' );
var spawn = require( 'child_process' ).spawn;

/**
 * This function fetches json data about a media file.
 */
var ffprobe = module.exports = function( filePath ){ // jshint ignore:line
    var deferred = Q.defer();
	var cData = '';
	var params = [ '-print_format', 'json', '-show_streams', filePath ];
	var ffprobeSpawn;
	//-f mulaw -ar 8000
	
	if ( path.extname( filePath ).toUpperCase() == '.ULW' ) {
		/**
		 * This is a ulw so ffmpeg needs some extra parameters so it knows how
		 * to handle the input file.
		 */
		params = [].concat( '-f', 'mulaw', '-ar', '8000', params );
	}
	
    // Spawn a new child process for ffprobe.
	ffprobeSpawn = spawn( 'ffprobe', params );

    // Do this when ffprobe finishes.
	ffprobeSpawn.on( 'close', function(){
		var oData = null;

		try {
			oData = JSON.parse( cData );
		}
		catch( err ){
			oData = null;
		}

        deferred.resolve( oData );
	});

    // Do this whenever we received any data from the ffprobe process.
	ffprobeSpawn.stdout.on( 'data', function( data ){
		cData = cData.concat( data );
	});

    return deferred.promise;

};// /ffprobe()