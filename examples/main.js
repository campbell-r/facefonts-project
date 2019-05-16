window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var filter1 = document.getElementById('filter1');
  var filter2 = document.getElementById('filter2');
  var filter3 = document.getElementById('filter3');
  var img = document.createElement('img');
filter1.addEventListener('click', function(){
  img.src = 'https://data.whicdn.com/images/272109778/large.png';
});
filter2.addEventListener('click', function(){
  img.src = 'examples/assets/bald.png';

});
filter3.addEventListener('click', function(){
  img.src = 'examples/assets/horns.png';
});
  var tracker = new tracking.ObjectTracker(['face']);
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  tracking.track('#video', tracker, { camera: true });
  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function(rect) {
      context.drawImage(img, rect.x, rect.y/4, rect.width + 15, rect.height * 1.9);

    });
  });
  var gui = new dat.GUI();
        gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
        gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
        gui.add(tracker, 'stepSize', 1, 5).step(0.1);
};
