var Preload = function() {
    var loading_label;
    var loading_text;
    var time_event;

    this.initialize = function initialize() {
        loading_screen.set_loading_text();
        preload.preload_jpg();
        preload.preload_gif();
        preload.preload_png();
        preload.preload_audio();
    }

    this.preload_jpg = function preload_jpg() {
        game.load.image('background', 'assets/misc/starfield.jpg');
    };

    this.preload_gif = function preload_gif() {
        game.load.image('loading', 'assets/misc/loading_please_wait.gif');
    };

    this.preload_png = function preload_png() {
        game.load.image('football', 'assets/misc/football.png');
        game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        game.load.image('tapper', 'assets/misc/tapper.png');
        game.load.image('tapper_white', 'assets/misc/tapper_white.png');
        game.load.image('small_particle', 'assets/misc/particle_smallest.png');
    };

    this.preload_audio = function preload_audio() {
        var directory = 'songs/'

        // Need to load these conditionally - in mobile devices,
        // the game starts jerking if it tries to load all the music.
        // Jerking in a rythm game where timing is of utter importance is BAD!

        //  Firefox doesn't support mp3 files, so use ogg
        if (current_song == 'avicii-the_nights') {
            game.load.audio('avicii-the_nights', [directory + 'avicii-the_nights.mp3', directory + 'avicii-the_nights.ogg']);
        } else if (current_song == 'passenger-let_her_go') {
            game.load.audio('passenger-let_her_go', [directory + 'passenger-let_her_go.mp3', directory + 'passenger-let_her_go.ogg']);
        } else if (current_song == 'justin-bieber-sorry') {
            game.load.audio('justin-bieber-sorry', [directory + 'justin-bieber-sorry.mp3', directory + 'justin-bieber-sorry.ogg']);
        } else if (current_song == 'the-script-breakeven') {
            game.load.audio('the-script-breakeven', [directory + 'the-script-breakeven.mp3', directory + 'the-script-breakeven.ogg']);
        }
    };

    this.set_loading_text = function set_loading_text() {
        loading_text = "Loading";
        loading_label = game.add.text(
            game.world.bounds['width'] / 2,
            game.world.bounds['height'] / 2,
            loading_text, { font: '40px Arial', fill: '#ffffff' }
        );
        var text_width = game.world.bounds['width'] - 150;
        if (text_width > 500) {
            text_width = 500;
        }

        loading_label.anchor.set(0.5);

        time_event = game.time.events.add(500, update_loading_text, this);
    };

    this.destroy_loading_text = function destroy_loading_text() {
        loading_label.destroy();
    }

    function update_loading_text() {
        // finds number of periods (".") in the loading text
        var count = loading_text.match(/\./g);
        var dots = '';

        if (count !== null) {
            count = count.length;
        }

        if (count == null) {
            loading_text = '. Loading .';
        } else if (count == 2) {
            loading_text = '.. Loading ..';
        } else if (count == 4) {
            loading_text = '... Loading ...';
        } else if (count == 6) {
            loading_text = 'Loading';
        }

        loading_label.setText(loading_text);
        game.time.events.add(500, update_loading_text, this);
    }
};