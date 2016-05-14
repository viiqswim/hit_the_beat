var Song = function() {
	var music;
	this.current_song = '';

	this.initialize = function initialize(song_name, callback) {
    	music = game.add.audio(song_name);
        garbage_collector.add_object(music);
    	game.sound.setDecodedCallback([music], callback, this);
	};

	this.play = function play() {
    	music.play();
	};

	this.pause = function pause() {
    	music.pause();
	};

	this.stop = function stop() {
    	music.stop();
	};

	this.resume = function resume() {
		music.resume();
	};
}