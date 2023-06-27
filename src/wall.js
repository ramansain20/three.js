import * as THREE from 'three'
const wallBaseTexture = new THREE.TextureLoader().load('./walls/baseColor.jpg' ); 
const reversebaseColor = new THREE.TextureLoader().load('./walls/reversebaseColor.jpg' );

wallBaseTexture.minFilter = THREE.NearestFilter
wallBaseTexture.magFilter = THREE.NearestFilter;
wallBaseTexture.wrapS = THREE.RepeatWrapping;
const walls=new THREE.Group();
export default function createAllWall(coordinates){// coordinates is an array of arrays of coordinates
const materials = [new THREE.MeshStandardMaterial(),
    new THREE.MeshStandardMaterial({map:wallBaseTexture}),
    new THREE.MeshStandardMaterial({map:reversebaseColor}), 
    new THREE.MeshStandardMaterial({map:wallBaseTexture}), 
    new THREE.MeshStandardMaterial({map:wallBaseTexture}), 
    new THREE.MeshStandardMaterial({map:wallBaseTexture})
];


coordinates.forEach((coordinate)=>{
    
    const x1=coordinate.x1*10;
    const y1=coordinate.y1*10;
    const x2=coordinate.x2*10;
    const y2=coordinate.y2*10;
    const length=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));

    
    const geometry = new THREE.BoxGeometry(length,0.2, 40);
    geometry.center();
    const wall = new THREE.Mesh(geometry, materials);
    wall.position.z=0;
    wall.position.x=(x1+x2)/2;
    wall.position.y=(y1+y2)/2;
    
    wall.rotation.z=Math.atan((y2-y1)/(x2-x1));
    walls.add(wall);
})
    
    return walls;
}
