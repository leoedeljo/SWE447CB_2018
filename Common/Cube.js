
function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           -0.5, -0.5, -0.5, // V0
           0.5, -0.5, -0.5, // V1
           0.5, 0.5, -0.5, // V2
           -0.5, 0.5, -0.5, // V3
           0.5, -0.5, 0.5, // V4
           0.5, 0.5, 0.5, // V5
           -0.5, 0.5, 0.5,  // V6
	   -0.5, -0.5, 0.5  // V7
            ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
            0, 2, 3,//0, 1, 2,
	    0, 1, 2,//2, 1, 4,
	    2, 1, 4,//4, 5, 2,
	    4, 5, 2,//2, 5, 6,
	    2, 6, 3,//6, 3, 2,
	    2, 5, 6,//2, 3, 0,
	    6, 5, 4,//0, 3, 6,
	    4, 7, 6,//6, 7, 0,
	    4, 1, 0,//0, 7, 1,
            0, 7, 4,//1, 7, 4,
	    7, 0, 6,//4, 7, 6,
	    6, 0, 3//6, 5, 4
        ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
