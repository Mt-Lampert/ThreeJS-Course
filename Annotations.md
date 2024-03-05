
## 1. Dirty Hands

Die Arbeit mit _Three.JS_ muss man sich vorstellen wie ein Film-Set (schöne
Grüße nach Babelsberg oder nach Hollywood).

1. Die _scene_ ist das Bühnenbild, d.h. der Raum oder der Flecken Erde, der von
   der _camera_ eingefangen wird.
2. Die _camera_ ist das Objekt, das die _scene_ „sieht“, in diesem Fall soll es
   eine _PerspectiveCamera_ sein.

```javascript
const camera = new Three.PerspectiveCamera(
    75,                                        
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
```

- '75' bestimmt den Winkel, den die Kamera erfassen soll. Bei '180' würde sie
  180 Grad ihrer Umgebung erfassen, hier nur 75 Grad. Je weiter die Objekte an
  den Rand dieses Winkels gehen, desto verzerrter und undeutlicher werden sie
  dabei.
- Das zweite Argument bestimmt das Seitenverhältnis des entstehenden
  Kamerabildes Das betrifft dann solche Sachen wie 4:3 oder 16:9.
- Das Dritte Argument betrifft den _inneren Abstand von der Linse._ Alle
  Objekte, die sich „vor“ dieser Linie befinden, werden aus dem Kamerabild
  gestrichen. 0.1 Einheiten wie hier geben allerdings extrem wenig Raum dafür.
- Das vierte Argument betrifft den _äußeren Abstand von der Linse._ Alle
  Objekte, die sich „hinter“ dieser Linie befinden, werden aus dem Kamerabild
  gestrichen. 1000 Einheiten sind hier ziemlich großzügig bemessen.

3. Der _renderer_ ist die „Maschine“ in der Kamera, die das Bild oder den Film
   erzeugt. `WebGLRenderer` ist eine Maschine, die dafür _WebGL_ verwendet. Mit
   `setSize()` bestimmen wir, wie groß das Bild werden soll, das der Renderer
   erzeugt. Hier genau so hoch und genau so breit wie der Viewport.

4. `document.body.appendChild(renderer.domObject)` fügt die gerenderte _scene_
   in den DOM ein, und zwar in ein `<canvas>`-Element, das genau so hoch und
   genau so breit ist wie bei `.setSize()` angegeben.


### Ein Objekt erzeugen

```javascript
// 1 unit wide, 1 unit high, 1 unit deep 
const geometry = new Three.BoxGeometry( 1, 1, 1 );
// what shall the cube be made of? -- a green color!
const material = new Three.MeshBasicMaterial( { color: 0x00ff00 } );
// now build the cube using the geometry and the 'material'
const cube = new Three.Mesh( geometry, material );
// add the cube to the scene
scene.add( cube );

// place the camera 5 units in front of the cube:
camera.position.z = 5
```

Ein _Mesh_ ist für _Three.JS_ ein Objekt, das „gebaut“ wird und dann Teil
der Szene ist. In diesem Fall ist der _Mesh_ der Würfel, den wir gebaut
haben.

### Rendern heißt animieren

```javascript
function animate() {
    // refresh every 60 times per second
	requestAnimationFrame( animate );

    // rotate the cube at every refresh as specified here
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // now render the damn cube!
	renderer.render( scene, camera );
}

animate();
```

Damit wird der Würfel 60 mal in der Sekunde [!!!] neu gezeichnet.
