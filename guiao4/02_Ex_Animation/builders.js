/*
    make a totem
*/
function createTotem(x, z, scaling = new THREE.Vector3(1, 1, 1)) {
    // Creating a model by grouping basic geometries

    // totem base
    const baseRadius = 3;
    const baseHeight = 10;
    const baseGeometry = new THREE.CylinderGeometry(baseRadius, baseRadius, baseHeight); 
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);

    // move bottom of base to y = 0
    base.position.y = baseHeight / 2.0;

    // totem top
    const topRadius = 5;
    const topHeight = 2;
    const topGeometry = new THREE.CylinderGeometry(topRadius, topRadius, topHeight);
    const topMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 })
    const top = new THREE.Mesh(topGeometry, topMaterial);

    // move bottom of top to top of base
    top.position.y = baseHeight + topHeight / 2.0;

    // idol
    const idolRadius = 6;
    const idolDetail = 1;
    var idolGeometry = new THREE.OctahedronGeometry(idolRadius, idolDetail);
    var idolMaterial = new THREE.MeshLambertMaterial({ color: 0x940500 });
    var idol = new THREE.Mesh(idolGeometry, idolMaterial);
    
    // move idol to above totem
    const offset = 4;
    idol.position.y = baseHeight + topHeight + offset + idolRadius / 2.0;

    // idol outlines
    var idolEdges = new THREE.EdgesGeometry(idolGeometry);
    var idolLines = new THREE.LineSegments(idolEdges, new THREE.LineBasicMaterial({ color: 0xbb0000 }));

    // move outlines to idol
    idolLines.position.x = idol.position.x;
    idolLines.position.y = idol.position.y;
    idolLines.position.z = idol.position.z;

    // shadows
    base.castShadow = true;
    base.receiveShadow = true;
    top.castShadow = true;
    top.receiveShadow = true;
    idol.castShadow = true;
    idol.receiveShadow = true;

    // whole totem
    var totem = new THREE.Group();
    totem.add(base);
    totem.add(top);
    totem.add(idol);
    totem.add(idolLines);

    totem.position.x = x;
    totem.position.z = z;
    totem.scale.x = scaling.x;
    totem.scale.y = scaling.y;
    totem.scale.z = scaling.z;

    return totem;
}

/*
    make a group of 2 totems
*/
function createTotemGroup(x, z, offset) {
    var group = new THREE.Object3D();
    group.position.set(x, 0, z);
    var totem1 = createTotem(-offset, offset);
    var totem2 = createTotem(offset, -offset);
    group.add(totem1);
    group.add(totem2);
    return group;
}