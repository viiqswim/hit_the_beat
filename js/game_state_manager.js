var GameStateManager = function() {
    this.initialize = function() {
        game.state.add('main', Main);
        game.state.add('loading_screen', LoadingScreen);
        game.state.add('menu', Menu);
        game.state.add('game', Game);
        this.start_main();
    };

    this.start_splash = function start_splash() {
        state_change_actions();
        game.state.start('loading_screen');
    };

    this.start_main = function start_main() {
        state_change_actions();
        game.state.start('main');
    };

    this.start_menu = function start_menu() {
        remove_missed_notes();
        song.stop_song();
        state_change_actions();
        game.state.start('menu');
    };

    this.start_game = function start_game() {
        state_change_actions();
        game.state.start('game');
    };

    function state_change_actions() {
        reset_variables();
        garbage_collector.trash_objects();
    };

    function reset_variables() {
        tappers = [];
        invisible_tappers = [];

        note_lanes.initialize();
        pause.initialize();
    }
};
