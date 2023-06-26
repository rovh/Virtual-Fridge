import {
    check_intersection,
    show_product as show_product,
} from './functions_for_three.js';
import {products_dictionary as products} from './dictionary.js'
import {materials_dictionary as materials} from './materials.js'

import * as THREE from 'three';


import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';


// Настройки сцены
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );


// Настройка камеры
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 20000 );
camera.position.set( 0, 60, 100 );
scene.add(camera);

// Настройка renderer
const renderer = new THREE.WebGLRenderer
({ antialias: true,
    // precision: "highp",
    // powerPreference: "high-performance"
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//controls.update() must be called after any manual changes to the camera's transform
// const controls = new OrbitControls( camera, renderer.domElement );
// var controls = new FirstPersonControls( camera, renderer.domElement );
// controls.movementSpeed = 0;
// controls.enableed = false;
// controls.lookSpeed = 0.1;
// controls.update();
// camera.position.set( 0, 120, 100 );
// controls.lookVertical = true;

let controls = new FirstPersonControls( camera, renderer.domElement );
controls.lookSpeed = 0.1;
controls.noFly = true;
controls.activeLook = false;
// controls.verticalMax = Math.PI - 100;
// controls.heightCoef = 0;
// controls.lookVertical = false;




function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


// Глобальное освещение
{
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    light.castShadow = true;
    scene.add(light);
}
// {    
//     const light = new THREE.DirectionalLight(0xffffff);
//     light.castShadow = true;
//     scene.add(light);
// }
{
const light = new THREE.PointLight(0xffffff, 0.7)
light.position.set(0, 100, 100);
light.castShadow = true;
scene.add(light)
}


const glftLoader = new GLTFLoader();
glftLoader.load('./static/Fridge.gltf', (gltfScene)=>
{

        gltfScene.scene.rotation.y = Math.PI/-2;
        gltfScene.scene.position.y = 3;
        const scale_factor = 2;
        gltfScene.scene.scale.set(scale_factor, scale_factor, scale_factor);

        gltfScene.scene.traverse(object => {
            
            object.castShadow = true;

            try
            {
                object.material.name;

                if (object.type == "Mesh")
                {
                    for (var i in materials)
                    {
                        if (object.material.name == materials[i].name)
                        {
                            object.material = materials[i];
                        }
                    }
    
                }
            
            }
            catch(TypeError){}
            
        });     

        scene.add(gltfScene.scene);
});


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
    
function onPointerDown( event ) 
{

        pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

        raycaster.setFromCamera( pointer, camera );
        
        let intersected_object = check_intersection(raycaster, scene);

        show_product(intersected_object)

        console.log(intersected_object.position);
        
        controls.lookAt(intersected_object.position);

}



const clock = new THREE.Clock();

// Анимация | каждый кадр
function animate() {
	requestAnimationFrame(animate);

    // window.addEventListener( 'pointermove', onPointerMove );

    // raycaster.setFromCamera( pointer, camera );

    // const intersects = raycaster.intersectObjects( scene.children );

	// for ( let i = 0; i < intersects.length; i ++ ) {

	// 	intersects[ i ].object.material.color.set( 0xff0000 );

	// }

    controls.update( clock.getDelta() );
	renderer.render(scene, camera);

}
// Запуск анимации

window.addEventListener('resize', onWindowResize, false)
document.addEventListener( 'pointerdown', onPointerDown );
animate();

