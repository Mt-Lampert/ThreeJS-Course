import * as Three from 'three'

const scene = new Three.Scene()
const camera = new Three.PerspectiveCamera(
    75,                                        
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new Three.WebGLRenderer();
renderer.setSize(window.innerWidth * 2 / 3 , window.innerHeight * 2 / 3)


//
// construct a cube
//

// 1 unit wide, 1 unit high, 1 unit deep 
const geometry = new Three.BoxGeometry( 1.5, 1.5, 1.5 );
// what shall the cube be made of? -- a green color!
const material = new Three.MeshBasicMaterial( { color: 0x00ff00 } );
// now build the cube using the geometry and the 'material'
const cube = new Three.Mesh( geometry, material );
// add the cube to the scene
scene.add( cube );

// place the camera 5 units in front of the cube:
camera.position.z = 5

function animate() {
	requestAnimationFrame( animate );

    // rotate the cube at every refresh as specified here
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // now render the damn cube!
	renderer.render( scene, camera );
}
animate();

// include the rendered media object into the DOM
// as last element of <body>
document.body.appendChild(renderer.domElement)





