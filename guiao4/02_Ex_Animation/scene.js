"use strict";

//  Adapted from Daniel Rohmer tutorial
//
// 		https://imagecomputing.net/damien.rohmer/teaching/2019_2020/semester_1/MPRI_2-39/practice/threejs/content/000_threejs_tutorial/index.html
//
// 		J. Madeira - April 2021


// To store the scene graph, and elements usefull to rendering the scene
const sceneElements = {
    sceneGraph: null,
    camera: null,
    renderer: null,
};


// Functions are called
//  1. Initialize the empty scene
//  2. Add elements within the scene
//  3. Animate
helper.initEmptyScene(sceneElements);
load3DObjects(sceneElements.sceneGraph);
requestAnimationFrame(computeFrame);


// Create and insert in the scene graph the models of the 3D scene
function load3DObjects(sceneGraph) {

    // ************************** //
    // Create a ground plane
    // ************************** //
    const planeGeometry = new THREE.PlaneGeometry(6, 6);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 'rgb(20, 20, 20)', side: THREE.DoubleSide });
    const planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
    sceneGraph.add(planeObject);

    // Change orientation of the plane using rotation
    planeObject.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    // Set shadow property
    planeObject.receiveShadow = true;

    // ************************** //
    // Create a totem
    // ************************** //
    const totem1 = createTotem(0, 0, new THREE.Vector3(0.1, 0.1, 0.1));
    totem1.name = "totem";
    sceneGraph.add(totem1);
}

// Displacement value

var delta = 0.05;
var delta2 = 0.01;

function computeFrame(time) {

    // Can extract an object from the scene Graph from its name
    const light = sceneElements.sceneGraph.getObjectByName("light");

    // Apply a small displacement
    if (light.position.x >= 10) {
        delta *= -1;
    } else if (light.position.x <= -10) {
        delta *= -1;
    }
    light.translateX(delta);

    const totem = sceneElements.sceneGraph.getObjectByName("totem");
    totem.children[2].rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
    totem.children[3].rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.01);
    if (totem.children[2].position.y > 21 || totem.children[2].position.y < 18) {
        delta2 *= -1;
    }
    totem.children[2].position.y += delta2;
    totem.children[3].translateY(delta2);

    // Rendering
    helper.render(sceneElements);

    // Call for the next frame
    requestAnimationFrame(computeFrame);
}