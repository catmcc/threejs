function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

    const fov = 75; //field of view; 75 degrees
    const aspect = window.innerWidth / window.innerHeight; 
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 3; //mess around with this

    const scene = new THREE.Scene();
    
    


    const color = 0xFFFFFF;
    const intensity = 1;
    //const light = new THREE.DirectionalLight(color, intensity);
    const light = new THREE.PointLight(color, intensity);
    //light.position.set(-1,2,4);
    scene.add(light);

    
    //const fixedintensity = 0.2;
    //const fixedlight = new THREE.DirectionalLight(color, fixedintensity);
    //fixedlight.position.set(0,0,2);
    //scene.add(fixedlight);
    

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        
        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ];

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }

    
    function render(time){
        time *= 0.001; // convert time to seconds
   
        //light.position.set(Math.sin(time),Math.cos(time),Math.cos(time));
        light.position.set(Math.cos(time)*10, 0, Math.sin(time)*10);
        
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });
        
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

}


main();