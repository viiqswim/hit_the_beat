var Create = function() {
    this.initialize = function initialize(self) {
        song.initialize(current_song, function() {
            preload_game_creation(play_game);
        });

        continue_game_even_if_focus_away(self);
    }

    function preload_game_creation(callback) {
        loading_screen.destroy_loading_screen();

        layout();

        user_input.register_keys();
        user_input.handle_mobile_events();
        pause.create_pause_button();

        // Particles used when a note is hit
        emitter = game.add.emitter(0, 0, 200);
        emitter.makeParticles('small_particle');

        statistics.initialize();

        callback();
    }

    function play_game() {
        song.play();
        song_generator.initialize(current_song);
        song_generator.play_next_song_note();
    }

    function continue_game_even_if_focus_away(self) {
        // the game actually stops some parts of it when
        // a player focuses away from it. It's pretty annoying
        // for this kind of game
        self.stage.disableVisibilityChange = true;
    }
};