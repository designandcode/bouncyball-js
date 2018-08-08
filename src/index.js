import Bounce from './lib/Bounce/';
import './styles/main.scss';

// Initialize with defaults
let bounce = Bounce({
  top: 0,
  bottom: 350,
  duration: 775,
  canvas: 800, // optional
  //left: 425, // canvas+width/2 // optional
  //pause: 0 // optional
});
	
// Start the animation for one element
/*bounce.el('el', {
  left: 150,
  pause: 2000
});*/

/*bounce.el('elio', {
  //left: 425, // optional
  //pause: 0 // optional
});*/

// Start the animation for one element
/*bounce.el('nice', {
  left: 450,
  pause: 2000
});*/

/*bounce.el('hero', {
  pause: 2000
});*/


// Create 20 more spread randomly over canvas and drop them in after 5000ms
// I am reusing existing bounce object because I want all new elements to
// have the same top, bottom, and duration. The spawn function randomly 
// generates left, pause, and el (element)
bounce.spawn({
  num: 20,
  spacing: false, // optional
  //domclass: [{small: 0.9}, {medium: 0.1}], // optional
  //delay: 5000, // optional
  //spread: 5000 // optional
});
