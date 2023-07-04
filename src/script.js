import './style.css'
import data from './data.json'
import data2 from './data2.js'
import * as THREE from 'three'
import createAllWall from './wall.js'
import createAllDoor from './door.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import createPlane from './plane'
/**
 * Base
 */
// Canvas
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
const scene = new THREE.Scene()
const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );
const group=new THREE.Group();
const axesHelper = new THREE.AxesHelper( 50 );
scene.add( axesHelper );

const wallCoordinates=[]

//Using hellodata.ai

// data.rooms.forEach(room=>{
// 	const vertices=room.polygon;
// 	const length=vertices.length;
// 	for(let i=0;i<length-1;i++){
		
// 		wallCoordinates.push({x1:vertices[i][0]/10,y1:vertices[i][1]/10,x2:vertices[i+1][0]/10,y2:vertices[i+1][1]/10})
// 	}
// })
// const walls = createAllWall(wallCoordinates);

//Using openCV

data2.forEach(room=>{
	
	for(let i=0;i<room.length;i++){
		console.log(room[i]);
		wallCoordinates.push({x1:room[i][0]/10,y1:room[i][1]/10,x2:room[i][2]/10,y2:room[i][3]/10})
	}
})
const walls = createAllWall(wallCoordinates);
group.add(walls);
console.log(group);
const plane =createPlane();
group.add(plane);

const doorsCoordinates=[
	// {x1:1,y1:10,x2:4,y2:10},
	// {x1:1,y1:0,x2:4,y2:0},
	// {x1:0,y1:1,x2:0,y2:4},
]
const doors = createAllDoor(doorsCoordinates);
group.add(doors);

const camera = new THREE.PerspectiveCamera( 45, sizes.width / sizes.height, 0.1, 1000000 );
camera.position.set( 0, 0, 800 );
camera.lookAt( group.position.x, group.position.y, 0 );
const controls = new OrbitControls( camera,canvas);
controls.mouseButtons = {
	RIGHT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	LEFT: THREE.MOUSE.PAN
};
controls.enableDamping = true;
scene.add( camera );

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
new THREE.Box3().setFromObject( group ).getCenter( group.position ).multiplyScalar( - 1 );
scene.add(group);
function animate() {

	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );

}
animate();