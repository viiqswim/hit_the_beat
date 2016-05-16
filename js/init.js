var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');


var Main = function() {};

Main.prototype = {

    preload: function() {
        game.load.image('stars', 'assets/images/stars.jpg');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('brand', 'assets/images/logo.png');
        game.load.script('polyfill', 'lib/polyfill.js');
        game.load.script('utils', 'lib/utils.js');
    },

    start_pointers: function() {
        // Add pointers (for mouse + fingers)
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
    },

    create: function() {
        this.start_pointers();
        game_state_manager.start_splash();
    }

};

game_state_manager.initialize();
