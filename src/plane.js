import * as THREE from 'three'
import earcut from "earcut"
export default function createPlane(coordinates) {

    // let polyShape = new THREE.Shape(coordinates.forEach((coord) => new THREE.Vector2(coord.x, coord.y)))
    // let geometry = new THREE.ShapeGeometry(polyShape);
    // let plane=new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000,wireframe:true}));
    // plane.position.z=-20;
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(coordinates.length * 3)
    const normals = new Float32Array(coordinates.length * 3)
    const colors = new Float32Array(coordinates.length * 3)
    
    for(let i=0;i<coordinates.length;i++){
        vertices[i*3]=coordinates[i].x*10;
        vertices[i*3+1]=coordinates[i].y*10;
        vertices[i*3+2]=-20;
        normals[i*3]=0;
        normals[i*3+1]=0;
        normals[i*3+2]=1;
        colors[i*3]=1;
        colors[i*3+1]=0;
        colors[i*3+2]=0;
    

    }
    const indices = earcut(vertices);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals()
    const material = new THREE.MeshBasicMaterial({ vertexColors: true});
    const plane = new THREE.Mesh(geometry, material);
    console.log(plane);
     
    return plane;
}