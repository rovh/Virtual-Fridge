import * as THREE from 'three';

function fragmentShader()
{
  return `
      void main()
      {
         gl_FragColor = vec4( 1.0, 1.0, 0.0, 1.0);
      }
  `;
}

function vertexShader()
{
    return `
    void main()
    {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;
}

var uniforms = {};


export const materials_dictionary = 
{
    // material1:  new THREE.ShaderMaterial
    // ({
    //     name: "None",
    //     uniforms         : uniforms,
    //     fragmentShader    : fragmentShader(),
    //     vertexShader        : vertexShader(),
    // }),
    one: 123,
    two: 2323,

    milk: new THREE.MeshStandardMaterial
    ({
        name: "milk",
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
    }),


    cheese: new THREE.MeshStandardMaterial
    ({
        name: "cheese",
        color: 0xffff00,
        metalness: 0,
        roughness: 0,
    }),

    chips: new THREE.MeshStandardMaterial
    ({
        name: "chips",
        color: 0xffff00,
        metalness: 0,
        roughness: 0,
    }),

    fridge: new THREE.MeshStandardMaterial
    ({
        name: "fridge",
        color: (0xdddddd),
        metalness: 0,
        roughness: 0,
    }),

    chocolate: new THREE.MeshStandardMaterial
    ({
        name: "chocolate",
        color: ("hsl(30, 30%, 30%)"),
        metalness: 0,
        roughness: 0,
    }),




}