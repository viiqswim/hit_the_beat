var Song = function() {
	var music;

	this.initialize = function initialize(song_name, callback) {
        // game.load.audio('avicii-the_nights', ['avicii-the_nights.mp3', 'avicii-the_nights.ogg']);
    	music = game.add.audio(song_name);
    	game.sound.setDecodedCallback([music], callback, this);
	}

	this.play = function play() {
    	music.play();
	}

	this.pause = function pause() {
    	music.pause();
	}

	this.stop = function stop() {
    	music.stop();
	}

	this.resume = function resume() {
		music.resume();
	}
}