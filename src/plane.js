import * as THREE from 'three'
import earcut from "earcut"
const floorBaseTexture = new THREE.TextureLoader().load('./floors/baseColor.jpg' ); 
floorBaseTexture.minFilter = THREE.NearestFilter
floorBaseTexture.magFilter = THREE.NearestFilter;
floorBaseTexture.wrapS = THREE.RepeatWrapping;
floorBaseTexture.wrapT = THREE.RepeatWrapping;
floorBaseTexture.repeat.set( 5, 5 );
const materials=[
    new THREE.MeshStandardMaterial({color:0xffffff}),
    new THREE.MeshStandardMaterial({color:0xffffff}),
    new THREE.MeshStandardMaterial({color:0xffffff}),
    new THREE.MeshStandardMaterial({color:0xffffff}),
    new THREE.MeshStandardMaterial({map:floorBaseTexture}),
    new THREE.MeshStandardMaterial({map:floorBaseTexture}),

]
export default function createPlane(dimensions) {
    const geometry = new THREE.BoxGeometry(dimensions.height,dimensions.width,10);
    const plane = new THREE.Mesh(geometry, materials);
    plane.position.z=-200;
    return plane;
}