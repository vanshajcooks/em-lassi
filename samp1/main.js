// Password validation with a simple function
document.querySelector(".login-form button").addEventListener("click", function() {
    const passwordInput = document.querySelector(".login-form input[type='password']");
    const password = passwordInput.value;
    const correctPassword = "secure123"; // Replace with your desired password

    if (password === correctPassword) {
        alert("Access Granted");
    } else {
        alert("Incorrect Password");
        passwordInput.value = ""; // Clear the input
    }
});

// Three.js for 3D Background Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Create a Torus for 3D background
const geometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Animation loop for 3D background with a smoother motion
function animate() {
    requestAnimationFrame(animate);

    // Animation: Smoothly rotate the torus for a subtle effect
    torus.rotation.x += 0.002;
    torus.rotation.y += 0.005;

    renderer.render(scene, camera);
}

animate();

// Responsive resize for 3D canvas
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
