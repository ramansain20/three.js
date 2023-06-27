import * as THREE from 'three'
import earcut from "earcut"
const floorBaseTexture = new THREE.TextureLoader().load('./floors/baseColor.jpg' ); 
const floorNormalTexture = new THREE.TextureLoader().load('./floors/normal.jpg' );
const floorRoughnessTexture = new THREE.TextureLoader().load('./floors/roughness.jpg' );
const floorAmbientOcclusionTexture = new THREE.TextureLoader().load('./floors/ambientOcclusion.jpg' );
floorBaseTexture.minFilter = THREE.NearestFilter
floorBaseTexture.magFilter = THREE.NearestFilter;
floorBaseTexture.wrapS = THREE.RepeatWrapping;
export default function createPlane(coordinates) {
    const extrusionSettings = {
        depth: 1,   
        bevelEnabled: false 
      };
    
    const geometry = new THREE.BufferGeometry(extrusionSettings);
    const vertices = new Float32Array(coordinates.length * 3)
    const normals = new Float32Array(coordinates.length * 3)
    const uvs = new Float32Array(coordinates.length * 2)
    for(let i=0;i<coordinates.length;i++){
        vertices[i*3]=coordinates[i].x*10;
        vertices[i*3+1]=coordinates[i].y*10;
        vertices[i*3+2]=-20;
        normals[i*3]=0;
        normals[i*3+1]=0;
        normals[i*3+2]=1;
    }
    
    const indices = earcut(vertices);
    for(let i=0;i<coordinates.length;i++){
        uvs[i*2]=coordinates[i].x/10;
        uvs[i*2+1]=coordinates[i].y/10;
    } 
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals()
    const material = new THREE.MeshBasicMaterial({map: floorBaseTexture});
    const plane = new THREE.Mesh(geometry, material);
     
    return plane;
}