exports.render = function (data) {

    const { ar } = data;
    return `
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script async src="https://unpkg.com/es-module-shims@1.8.0/dist/es-module-shims.js"></script>
    <script type="importmap">
    {
      "imports": {
	      "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
	      "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/",
	      "mindar-image-three":"https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-three.prod.js"
      }
    }
    </script>
    <script type="module">
      import * as THREE from 'three';
      import { MindARThree } from 'mindar-image-three';
      const mindarThree = new MindARThree({
	      container: document.querySelector("#container"),
	      imageTargetSrc: "../ar-media/images/pulvermuseum.mind"
      });
      const {renderer, scene, camera} = mindarThree;
      const anchor = mindarThree.addAnchor(0);
      
      let video = document.getElementById("video");
      let videoTexture = new THREE.VideoTexture(video);
      
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      
      var movieMaterial = new THREE.MeshBasicMaterial({
        map: videoTexture,
	      side: THREE.FrontSide,
	      toneMapped: false
      });
      
      function animate(){
        video.play();
        requestAnimationFrame(animate);
        
        videoTexture.needsUpdate = true;
      }
      
      const movieGeometry = new THREE.PlaneGeometry(1, 0.55);
      const plane = new THREE.Mesh( movieGeometry, movieMaterial );
      anchor.group.add(plane);
      const start = async() => {
	      await mindarThree.start();
	      renderer.setAnimationLoop(() => {
          animate();
          renderer.render(scene, camera);
	        });
      }
      const startButton = document.querySelector("#startButton");
      startButton.addEventListener("click", () => {
	      start();
      });
      stopButton.addEventListener("click", () => {
	      mindarThree.stop();
	      mindarThree.renderer.setAnimationLoop(null);
      });
    </script>
    <style>
      body {
	margin: 0;
      }
      #container {
	width: 100vw;
	height: 100vh;
	position: relative;
	overflow: hidden;
      }
      #control {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
      }
    </style>
  </head>
  <body>
  <video
      id="video"
      playsinline
      webkit-playsinline
      loop
      autoplay
      width="1290"
      height="1040"
      src="../ar-media/videos/pulvermuseum.webm"
      style="display: none"
    ></video>
    <div id="control">
      <button id="startButton">Start</button>
      <button id="stopButton">Stop</button>
    </div>
    <div id="container">
    </div>
  </body>
</html>
    `;
}