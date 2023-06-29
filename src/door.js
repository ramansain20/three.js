import * as THREE from 'three'
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/doors/baseColor.jpg')
const doorAlphaTexture = textureLoader.load('/doors/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/doors/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/doors/height.jpg')
const doorNormalTexture = textureLoader.load('/doors/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/doors/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/doors/roughness.jpg')

const materials = [
new THREE.MeshStandardMaterial({transparent:true,opacity:0}), //front
new THREE.MeshStandardMaterial({transparent:true,opacity:0}), //bottom
new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    aoMapIntensity: 2,
    displacementMap: doorHeightTexture,
    displacementScale: 100,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
}), //left
new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    aoMapIntensity: 2,
    displacementMap: doorHeightTexture,
    displacementScale: 100,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
}), //back
new THREE.MeshStandardMaterial({transparent:true,opacity:0}), //right    
new THREE.MeshStandardMaterial({transparent:true,opacity:0}), //top
]
const doors=new THREE.Group();
export default function createAllDoor(coordinates){
    coordinates.forEach((coordinate)=>{

        const x1=coordinate.x1*10;
        const y1=coordinate.y1*10;
        const x2=coordinate.x2*10;
        const y2=coordinate.y2*10;
        const length=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
        const geometry = new THREE.BoxGeometry(length,1.1, 30);
        
       
        const door = new THREE.Mesh(geometry, materials);
        door.geometry.setAttribute('uv2', new THREE.BufferAttribute(door.geometry.attributes.uv.array, 2))
        
        door.position.z=-5;
        door.position.x=(x1+x2)/2;
        door.position.y=(y1+y2)/2;
    
        door.rotation.z=Math.atan((y2-y1)/(x2-x1));
        doors.add(door);
    })
    return doors;
}
