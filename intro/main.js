let scene, camera, renderer, cube;

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("canvas"),
        antialias: true
      });
    //renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(2,2,2);
    //const material = new THREE.MeshBasicMaterial( {color: 0x0000ff});

    var texture = new THREE.TextureLoader().load( 'https://3.bp.blogspot.com/-EEUUY8FfiTU/WCEBr4oaguI/AAAAAAAAAuM/1SFEczoLJFkcOFp1YG3wJpClcRMJMJ8YQCLcB/s1600/minecraft%2Btexturas%2Bclassicas%2B-%2B12.jpg' );
    // immediately use the texture for material creation
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    
    //const texture = new THREE.TextureLoader().load('/minecraft.gif');
    //const material = new THREE.MeshBasicMaterial({ map: texture });
    
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

}


function animate() {
    requestAnimationFrame(animate);

    let canvas = document.getElementById('canvas');
    canvas.addEventListener('mousemove', function(event) {
        let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        let mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
        var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        vector.unproject( camera );
        var dir = vector.sub( camera.position ).normalize();
        var distance = - camera.position.z / dir.z;
        var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
        cube.position = pos;
        //cube.position.x = evt.clientX - 400 ;
        //console.log(event.clientX - 400);
    
    });


    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01; 
    cube.rotation.z += 0.01;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init();
animate();