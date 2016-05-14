var Game = {
    preload: function() {
        preload.initialize();
    },

    create: function() {
        create.initialize(this);
    },

    update: function() {
        update.initialize();
    },

    startGame: function() {
        // Change the state to the actual game.
        this.state.start('Game');
    },
};
