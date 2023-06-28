import {
    check_intersection,
    show_product as show_product,
} from './functions_for_three.js';
import {products_dictionary as products} from './dictionary.js'
import {materials_dictionary as materials} from './materials.js'

import * as THREE from 'three';
import * as TWEEN from 'tween.js';


import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { MapControls } from 'three/addons/controls/MapControls.js';
import CameraControls from 'camera-controls';

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
// controls.enablePan = false

let controls = new FirstPersonControls( camera, renderer.domElement );
controls.lookSpeed = 0.1;
controls.noFly = true;
controls.activeLook = false;
controls.verticalMax = Math.PI / -0.5;
controls.heightSpeed = true;
controls.heightCoef = 0.1;
controls.heightMax = 0.1;
controls.heightMin = 0.1;
controls.lookVertical = false;


// CameraControls.install( { THREE: THREE } );
// const controls = new CameraControls(camera, renderer.domElement)
// controls.dragToOffset = true
// let controls = new MapControls(camera, renderer.domElement)
// controls.screenSpacePanning = true;

// let controls2 = new FirstPersonControls( camera, renderer.domElement );







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

var position_target  = new THREE.Vector3();
var tween_position_vector = new THREE.Vector3();
var tween_position = {x:-11, y:50, z:-11};
var tween_position_target = {x:0, y:0, z:0};


function onPointerDown( event )
{

        pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );

        raycaster.setFromCamera( pointer, camera );
        
        let intersected_object = check_intersection(raycaster, scene);

        show_product(intersected_object)

        position_target = position_target.setFromMatrixPosition(intersected_object.matrixWorld);
                
        tween_position_target.x = position_target.x
        tween_position_target.y = position_target.y
        tween_position_target.z = position_target.z

        tween.start();
}

const tween = new TWEEN.Tween(tween_position)
.to(tween_position_target, 500)
.onStop(() => {
    tween_position = tween_position_target
})
.onUpdate(function ()
{
    tween_position_vector.x = tween_position.x
    tween_position_vector.y = tween_position.y
    tween_position_vector.z = tween_position.z

    // console.log(tween_position_vector)
    controls.lookAt(tween_position_vector);
})




const clock = new THREE.Clock();

// Анимация | каждый кадр
function animate() {
	requestAnimationFrame(animate);

    if (controls.mouseDragOn == true)
    {
        // console.log('123')
        controls.activeLook = true
    }
    else
    {
        controls.activeLook = false
    }

    TWEEN.update()

    // controls2.update( clock.getDelta() );
    controls.update( clock.getDelta() );
	renderer.render(scene, camera);

}
// Запуск анимации

window.addEventListener('resize', onWindowResize, false)
document.addEventListener( 'pointerdown', onPointerDown );
animate();

