var Song = function() {
    var music;
    this.current_song;

    this.initialize = function initialize(song_name, callback) {
        music = game.add.audio(song_name);
        garbage_collector.add_object(music);
        game.sound.setDecodedCallback([music], callback, this);
    };

    this.play_song = function play() {
        music.play();
    };

    this.pause_song = function pause() {
        music.pause();
    };

    this.stop_song = function stop() {
        if (music !== undefined) {
	        music.stop();
        }
    };

    this.resume_song = function resume() {
        music.resume();
    };
}
