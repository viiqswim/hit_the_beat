var GameStateManager = function() {
    this.initialize = function() {
        game.state.add('menu', Menu);
        game.state.add('game', Game);
        this.start_menu();
    };

    this.start_menu = function start_menu() {
		garbage_collector.trash_objects();
		game.state.start('menu');
    };

    this.start_game = function start_game() {
		garbage_collector.trash_objects();
		game.state.start('game');
    };
};
