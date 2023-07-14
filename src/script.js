import './style.css'
import * as THREE from 'three'
import createAllWall from './wall.js'
import createAllDoor from './door.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import createPlane from './plane'


document.getElementById('form').addEventListener('submit', function (event) 
    {
        event.preventDefault(); 
        const imageInput = document.getElementById('imageInput');
        const imageFile = imageInput.files[0];

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('name', 'image');
        fetch('http://127.0.0.1:8000/upload/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            ThreejsBuilder(data);
        })
});






const ThreejsBuilder=(data)=>{
    const wallCoordinates=[]
    
    data.wallCoordinates.forEach(element => {
        wallCoordinates.push({
            x1:element.x1/10,
            y1:element.y1/10,
            x2:element.x2/10,
            y2:element.y2/10,
        })
    });


    const canvas = document.querySelector('canvas.webgl')
    canvas.style.display="block";
    const form = document.getElementById('form');
    form.style.display="none";
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
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    const scene = new THREE.Scene()
    const light = new THREE.AmbientLight( 0xffffff ); // soft white light
    scene.add( light );
    const group=new THREE.Group();
    const axesHelper = new THREE.AxesHelper( 50 );
    scene.add( axesHelper );
    
    
    
    const walls = createAllWall(wallCoordinates);
    
    group.add(walls);
    
    const plane =createPlane(data.dimensions);
    group.add(plane);
    
    const doorsCoordinates=[]
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
}
