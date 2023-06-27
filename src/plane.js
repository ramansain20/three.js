import * as THREE from 'three'
export default function createPlane() {

    const geometry = new THREE.BoxGeometry(500,500, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000});
    const plane = new THREE.Mesh(geometry, material);
    plane.position.z=-20;
    return plane;
}