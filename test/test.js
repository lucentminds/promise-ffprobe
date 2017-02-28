
var ffprobe = require( '../promise-ffprobe' );

// Call ffprobe and wait for the result.
ffprobe( './test/test.txt' )
.then( function( oResult ){

    // Output the result object to the console.
    console.log( oResult );
}).done();