import {
    check_intersection,
    find_product,
} from './functions_for_three.js';

import * as THREE from 'three';


import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Настройки сцены
const scene = new THREE.Scene();
// const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
// scene.background = spaceTexture;
scene.background = new THREE.Color( 0xffffff );

// Настройка камеры
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 120, 100 );




// Настройка renderer
const renderer = new THREE.WebGLRenderer
({ antialias: true,
    // precision: "highp",
    // powerPreference: "high-performance"
});
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setClearColor( 0xffffff, 0);
document.body.appendChild( renderer.domElement );


//controls.update() must be called after any manual changes to the camera's transform
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();



function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();


    renderer.setSize( window.innerWidth, window.innerHeight );
    
}



// Глобальное освещение
{
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}
// {    
//     const light = new THREE.DirectionalLight(0xffffff);
//     light.castShadow = true;
//     scene.add(light);
// }

{
    const light = new THREE.PointLight(0xffffff, 1)
    light.position.set(10, 10, 10)
    scene.add(light)

    }



// let array = [];

const glftLoader = new GLTFLoader();
glftLoader.load('./static/Fridge.gltf', (gltfScene)=>
{

        gltfScene.scene.rotation.y = Math.PI/-2;

        gltfScene.scene.position.y = 3;

        const scale_factor = 2;
        gltfScene.scene.scale.set(scale_factor, scale_factor, scale_factor);

        gltfScene.scene.traverse(object => {
            object.castShadow = true;
            // if (object.type == "Object3D")
            // {
            //     array.push(object.name);
            // }
            
        });
        
        // console.log(gltfScene.scene.getObjectByName('Meat')).material.color.setHex(0x00ff00);
        // console.log(array);
        

        scene.add(gltfScene.scene);
});


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
    
function onPointerDown( event ) 
{

        pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

        raycaster.setFromCamera( pointer, camera );
        
        let intersected_object = check_intersection(raycaster, scene);

        find_product(intersected_object)

}





// Анимация | каждый кадр
function animate() {
	requestAnimationFrame(animate);

    // window.addEventListener( 'pointermove', onPointerMove );

    // raycaster.setFromCamera( pointer, camera );

    // const intersects = raycaster.intersectObjects( scene.children );

	// for ( let i = 0; i < intersects.length; i ++ ) {

	// 	intersects[ i ].object.material.color.set( 0xff0000 );

	// }


    controls.update();

	renderer.render(scene, camera);
}
// Запуск анимации

animate();
window.addEventListener('resize', onWindowResize, false)
document.addEventListener( 'pointerdown', onPointerDown );

