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

export function find_product(intersected_object)
{
    console.log(intersected_object.name)

    let object_name = '';

    object_name = intersected_object.name;

    if (document.querySelector("header").classList.toggle('open') == false)
    {
        document.querySelector("header").classList.toggle("open")
    }

    // var canvas = document.getElementById("my-canvas");
    // var context = canvas.getContext("2d");

    // context.fillStyle = "blue";
    // context.font = "bold 16px Arial";
    // context.textAlign = 'center';
    // context.textBaseline = 'middle';
    // context.fillText(object_name, (canvas.width / 2), (canvas.height / 2));

    // document.getElementById('my_word').value = object_name;
    document.getElementById('my_word').innerHTML = object_name;
    



}
