import Velocity from 'velocity-animate';
import SeedArray from '../SeedArray/';

/**
 *  Bounces one or many HTML elements into a canvas like 
 *  a rubber ball.
 *  @param {object} config The init config object
 *  @returns {object} el, spawn
 */
export default function Bounce (config) {

  let Bounce = {};

  Bounce.init = function(cfg) {
    
    Bounce.config = cfg;

    Bounce.config.canvas = Bounce.config.canvas || 500;

    let container = document.getElementById('container');
    container.style.width = Bounce.config.canvas + 'px';
    container.style.height = Bounce.config.bottom + 'px';
  }

  Bounce.down = function(t, b, d, el, delay) {

    el.classList.add('is-falling');

    // Find out what this is for real (gravity)
    const g = ((b / 160) * 20);

    if (delay) {
      Velocity(el, { 
        translateY: [b, t]
      }, {
        delay: delay,
        duration: d,
        easing: 'easeInQuad',
        complete: Bounce.up.bind(null, t+g, b, d, el)
      })
    } else {
      Velocity(el, { 
        translateY: [b, t]
      }, {
        duration: d,
        easing: 'easeInQuad',
        complete: Bounce.up.bind(null, t+g, b, d, el)
      })
    }
  }

  Bounce.up = function(t, b, d, el) {

    // This is redundant after the first
    // time this method is called
    el.classList.remove('is-falling');
    el.classList.add('is-bouncing');

    if (t === b) {
      el.classList.remove('is-bouncing');
      el.classList.add('is-grounded');
      return;
    }
  
    // Find out what this is for real (gravity)
    const g = 50;

    Velocity(el, {
      translateY: [t, b]
    }, {
      duration: d,
      easing: 'easeOutQuad',
      complete: Bounce.down.bind(null, t, b, d-g, el)
    });
  }

  // Bounces a single html element
  let el = function(id, setup) {

    let el = document.getElementById(id);
    let c = Bounce.config;
    let s = setup || {};

    let pause = s.pause || 0;
    let left = s.left || (c.canvas - el.offsetWidth) / 2;

    el.style.left = left + 'px';
    

    window.setTimeout(() => {
      Bounce.down(c.top, c.bottom, c.duration, el);
    }, pause);
  }

  // Spawns n elements, drops them onto the canvas over
  // random time then bounces them until finished
  let spawn = function(opts) {

    let n = opts.num;
    let sizes = opts.domclass || [];
    let delay = opts.delay || 0;
    let spread = opts.spread || 5000;
    let nospacing = opts.spacing === false; 

    let container = document.getElementById('container');
    let c = Bounce.config;

    if (nospacing) {
      var elWidth = c.canvas / n;
    }

    let dist = sizes.length && SeedArray(n, sizes);
  
    window.setTimeout(() => {
      
      for (let i = 0; i < n; i++) {
        
        let left;

        if (nospacing) {
          left = elWidth * i; 
        } else {
          left = Math.floor(c.canvas * Math.random());     
        }

        let pause = Math.random() * (spread);
      
        let el = document.createElement('div');
        el.classList.add('el');
        dist.length && el.classList.add(dist[i]);
                  
      
        container.appendChild(el);

        let width = el.offsetWidth;

        if (width + left > c.canvas) {
          left = Math.floor((c.canvas - width) * Math.random());
        }

        el.id = 'el-' + left;
        el.style.left = left + 'px';

        if (nospacing) {
          el.style.width = el.style.height = elWidth + 'px';
          el.style.top = -elWidth + 'px';
        }
      
        Bounce.down(c.top, c.bottom, c.duration, el, pause);
      }
    }, delay);
  }

  Bounce.init(config);
    
  return {
    el: el,
    spawn: spawn
  }
}
