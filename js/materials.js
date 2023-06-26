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

    milk: new THREE.MeshStandardMaterial
    ({
        name: "milk",
        color: "hsl(30, 0%, 100%)",
        metalness: 0,
        roughness: 0,
    }),


    cheese: new THREE.MeshStandardMaterial
    ({
        name: "cheese",
        color: "hsl(60, 100%, 80%)",
        metalness: 0,
        roughness: 0,
    }),

    chips: new THREE.MeshStandardMaterial
    ({
        name: "chips",
        color: "hsl(120, 100%, 80%)",
        metalness: 0,
        roughness: 0,
    }),

    fridge: new THREE.MeshStandardMaterial
    ({
        name: "fridge",
        color: "hsl(0, 0%, 80%)",
        metalness: 0,
        roughness: 0,
    }),

    chocolate: new THREE.MeshStandardMaterial
    ({
        name: "chocolate",
        color: "hsl(30, 30%, 30%)",
        metalness: 0,
        roughness: 0,
    }),




}