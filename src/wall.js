import * as THREE from 'three'
const wallBaseTexture = new THREE.TextureLoader().load('./walls/baseColor.jpg' ); 
const reversebaseColor = new THREE.TextureLoader().load('./walls/reversebaseColor.jpg' );

wallBaseTexture.magFilter = THREE.NearestFilter;
wallBaseTexture.minFilter = THREE.NearestFilter
var walls = new THREE.Object3D();
export default function createAllWall(coordinates){// coordinates is an array of arrays of coordinates
const materials = [new THREE.MeshStandardMaterial(),
    new THREE.MeshStandardMaterial({color:0x000000}),
    new THREE.MeshStandardMaterial({color:0Xffffff ,map:reversebaseColor}), 
    new THREE.MeshStandardMaterial({color:0Xffffff ,map:wallBaseTexture}), 
    new THREE.MeshStandardMaterial({color:0x000000}), 
    new THREE.MeshStandardMaterial({color:0x000000}),
    new THREE.MeshStandardMaterial({color:0x000000}),
];


coordinates.forEach((coordinate)=>{
    
    const x1=coordinate.x1*10;
    const y1=coordinate.y1*10;
    const x2=coordinate.x2*10;
    const y2=coordinate.y2*10;
    const length=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

    
    const geometry = new THREE.BoxGeometry(length,1, 400);
    const wall = new THREE.Mesh(geometry, materials);
    wall.position.z=0;
    wall.position.x=(x1+x2)/2;
    wall.position.y=(y1+y2)/2;
    
    wall.rotation.z=Math.atan((y2-y1)/(x2-x1));
    walls.add(wall);
})


    var bbox = new THREE.Box3().setFromObject(walls); //get bounding box of object - this will be used to center it
    walls.position.set(-(bbox.min.x + bbox.max.x) / 2, -(bbox.min.y + bbox.max.y) / 2, 0);
    return walls;
}
