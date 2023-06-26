import { products_dictionary as dictionary } from "./dictionary.js";

export function check_intersection(raycaster, scene)
{

let intersected_object = NaN;

const intersects = raycaster.intersectObjects( scene.children, true );
    
    if ( intersects.length > 0 ) {
    
        let object = intersects[0].object

        while(object.type != 'Object3D')
        {
            object = object.parent;
        }

        while (object.parent.type == 'Object3D')
        {
            object = object.parent;
        }

        intersected_object = object;
        
    }

    return intersected_object;
}

export function show_product(intersected_object)
{
    // console.log(intersected_object.name)

    let object_name = '';   
    
    if (intersected_object.name != null)
    {
        object_name = intersected_object.name;

        document.getElementById('my_word').innerHTML = object_name;

        document.querySelector(".slide_menu").classList.add("open")
    }
    else
    {
        document.querySelector(".slide_menu").classList.remove("open")
    }

    document.getElementById("my_image").src = ""

    for (var i in dictionary)
    {
        if (dictionary[i].name == object_name)
        {
            document.getElementById("my_image").src = dictionary[i].src;
            break;
        }

    }
    
    



}
