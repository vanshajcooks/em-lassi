// Password validation
document.querySelector(".login-form button").addEventListener("click", function() {
    const passwordInput = document.querySelector(".password-input");
    const password = passwordInput.value;
    const correctPassword = "secure123"; // Replace with your desired password

    if (password === correctPassword) {
        alert("Access Granted");
    } else {
        alert("Incorrect Password");
        passwordInput.value = ""; // Clear the input
    }
});

// Three.js Setup for Solar Surface Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Create Sphere with Shader Material for "solar" effect
const geometry = new THREE.SphereGeometry(1.5, 32, 32);
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
            float wave = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time);
            vec3 color = vec3(0.0, wave, 0.0);
            gl_FragColor = vec4(color, 1.0);
        }
    `,
    transparent: true
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Animation loop with dynamic "solar" effect
function animate() {
    material.uniforms.time.value += 0.05;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Responsive resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
