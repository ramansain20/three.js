import './style.css'
import * as THREE from 'three'
import createAllWall from './wall.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import createPlane from './plane'
/**
 * Base
 */
// Canvas
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
const wallCoordinates=[
	{x1:0,y1:0,x2:10,y2:0},
	{x1:0,y1:0,x2:0,y2:10},
	{x1:5,y1:0,x2:5,y2:10},
	{x1:0,y1:10,x2:15,y2:10},
	{x1:10,y1:0,x2:15,y2:10},
	{x1:0,y1:5,x2:12.5,y2:5},

]
const walls = createAllWall(wallCoordinates);
group.add(walls);

const planeCoordinates=[
	{x:0,y:0},
	{x:10,y:0},
	{x:15,y:10},
	{x:0,y:10},
]
const plane =createPlane(planeCoordinates);
group.add(plane);
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 200 );
camera.lookAt( group.position.x, group.position.y, 0 );
const controls = new OrbitControls( camera,canvas);
controls.mouseButtons = {
	RIGHT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	LEFT: THREE.MOUSE.PAN
};
controls.enableDamping = true;
scene.add( camera );

renderer.setSize( window.innerWidth, window.innerHeight );
new THREE.Box3().setFromObject( group ).getCenter( group.position ).multiplyScalar( - 1 );
scene.add(group);
function animate() {

	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );

}
animate();