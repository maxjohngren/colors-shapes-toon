// The three.js scene: the 3D world where you put objects
const scene = new THREE.Scene();

// The camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

// The renderer: something that draws 3D objects onto the canvas
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaccc, 1);
// Append the renderer canvas into <body>
document.body.appendChild(renderer.domElement);

// Add a directional light to the scene pointing from the left to the right
const light = new THREE.DirectionalLight(0xffffbb, 1);
light.position.set(-2, -3, 3);
scene.add(light);

// A cube we are going to animate
const cube = {
  // The geometry: the shape & size of the object
  geometry: new THREE.BoxGeometry(1, 1, 1),
  // The material: the appearance (color, texture) of the object
  //material: new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  material: new THREE.MeshPhongMaterial({ color: 0x00ff00 })

};

// The mesh: the geometry and material combined, and something we can directly add into the scene (I had to put this line outside of the object literal, so that I could use the geometry and material properties)
cube.mesh = new THREE.Mesh(cube.geometry, cube.material);

// Add the cube into the scene
scene.add(cube.mesh);

// Make the camera further from the cube so we can see it better
camera.position.z = 4;

// generate random colors!
function generateRandomHexCode() {
  const characters = "0123456789ABCDEF";
  let hexCode = "#";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    hexCode += characters[randomIndex];
  }

  return hexCode;
}

function createSphere(scene){
  // now, create a sphere

  const newColor = generateRandomHexCode()
  const shapeTypes = ["BoxGeometry", "SphereGeometry", "ConeGeometry"];
  const randomShapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
  var geometry = null

  switch (randomShapeType) {
      case "BoxGeometry":
        geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        break;
      case "SphereGeometry":
        geometry = new THREE.SphereGeometry(0.1, 32, 32);
        break;
      case "ConeGeometry":
        geometry = new THREE.ConeGeometry(0.08, 0.4, 32);
        break;
      default:
        geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    }
  
  const sphere = {
    // The geometry: the shape & size of the object
    //geometry: new THREE.BoxGeometry(0.1,0.1,0.1),
    geometry: geometry,
    
    // The material: the appearance (color, texture) of the object
    //material: new THREE.MeshStandardMaterial({ color: newColor })
    material: new THREE.MeshToonMaterial({ color: newColor })
 
  };
  // The mesh: the geometry and material combined, and something we can directly add into the scene (
  sphere.mesh = new THREE.Mesh(sphere.geometry, sphere.material);
  // Add the sphere into the scene
  scene.add(sphere.mesh);
  return sphere
}

var spheres = []

for (var i = 0; i < 100; i++){
  var sphere = createSphere(scene)
  spheres.push(sphere)
  sphere.mesh.position.x = (Math.random() * 5 - 2.5)
  sphere.mesh.position.y = (Math.random() * 5 - 2.5)
  sphere.mesh.position.z = (Math.random() * 5 - 2.5)
}




function render() {
  // Render the scene and the camera
  renderer.render(scene, camera);

  // make all the spheres rise on the y axis
  for (var i = 0; i < spheres.length; i++) {
    spheres[i].mesh.position.y += 0.05
    if (spheres[i].mesh.position.y > Math.random() * 35){
      spheres[i].mesh.position.y = -3
      spheres[i].mesh.position.x = (Math.random() * 5 - 2.5)
      spheres[i].mesh.position.z = (Math.random() * 5 - 2.5)
    }
  }


  // Rotate the cube every frame
  cube.mesh.rotation.x += 0.01;
  cube.mesh.rotation.y -= 0.01;

  // Make it call the render() function about every 1/60 second
  requestAnimationFrame(render);
}

render();