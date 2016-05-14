var Emitters = function() {
	var emitter;

    this.initialize = function() {
        // Particles used when a note is hit
        emitter = game.add.emitter(0, 0, 200);
        garbage_collector.add_object(emitter);
        emitter.makeParticles('small_particle');
    }

    this.particleBurst = function particleBurst(coordinates) {
        emitter.x = coordinates['x'];
        emitter.y = coordinates['y'];

        emitter.gravity = 200;
        emitter.start(true, 300, 0, 15);
    }
}
