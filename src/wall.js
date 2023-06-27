import * as THREE from 'three'
const baseTexture = new THREE.TextureLoader().load('./walls/baseColor.jpg' ); 
const aoTexture = new THREE.TextureLoader().load('./walls/ambientOcclusion.jpg' ); 
const heightTexture = new THREE.TextureLoader().load('./walls/height.png' ); 
const normalTexture = new THREE.TextureLoader().load('./walls/normal.jpg' ); 
const roughnesstexture = new THREE.TextureLoader().load('./walls/roughness.jpg' ); 
export default function createAllWall(coordinates){// coordinates is an array of arrays of coordinates
    let walls=[];
coordinates.forEach((coordinate)=>{
    
    const x1=coordinate.x1*10;
    const y1=coordinate.y1*10;
    const x2=coordinate.x2*10;
    const y2=coordinate.y2*10;
    const length=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

    
    const geometry = new THREE.BoxGeometry(length,0.1, 40);
    const material = new THREE.MeshBasicMaterial({ color: 0x808080, map: baseTexture});
    material.aoMap=aoTexture;
    material.aoMapIntensity=1;
    // material.normalMap=normalTexture
    // material.roughnessMap=roughnesstexture;
    const wall = new THREE.Mesh(geometry, material);
    wall.geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
    wall.position.z=0;
    wall.position.x=(x1+x2)/2;
    wall.position.y=(y1+y2)/2;
    wall.rotation.z=Math.atan((y2-y1)/(x2-x1));
    walls.push(wall);
})
    return walls;
}
