var Menu = {

    preload: function() {
        loading_screen.set_loading_text();
        // Load all the needed resources for the menu.
        preload_jpg();
        preload_png();
        preload_audio();

        function preload_jpg() {
            game.load.image('background', 'assets/misc/dark_background_2.jpg');
        }

        function preload_png() {
            game.load.image('button_easy', 'assets/game_buttons/button_easy_2.png');
            game.load.image('button_medium', 'assets/game_buttons/button_medium_2.png');
            game.load.image('button_hard', 'assets/game_buttons/button_hard_2.png');
        }

        function preload_audio() {
            //  Firefox doesn't support mp3 files, so use ogg
        }
    },

    create: function() {
        var world_dimensions = {
            w: game.world.bounds['width'],
            h: game.world.bounds['height']
        };

        set_full_screen();
        set_background(world_dimensions);
        test.create_song_chart();
        loading_screen.destroy_loading_screen();
    },

    update: function() {
        // something
    },

    startGame: function() {
        // Change the state to the actual game.
        this.state.start('Game');

    },

};

var Test = function() {
    var buttons = [];

    function create_buttons(number_of_splits, button_positions, start_song_function) {
        var buttons = [];
        buttons.push(
            game.add.button(button_positions[0]['w'], button_positions[0]['h'],
                'button_easy', start_song_function, this)
        );
        buttons.push(
            game.add.button(button_positions[1]['w'], button_positions[1]['h'],
                'button_medium', start_song_function, this)
        );
        buttons.push(
            game.add.button(button_positions[2]['w'], button_positions[2]['h'],
                'button_hard', start_song_function, this)
        );


        for (var i = 0; i < buttons.length; i++) {
            buttons[i].anchor.set(0.5);
            buttons[i].tint = colors['white'];
            garbage_collector.add_object(buttons[i]);
        }

        return buttons
    }

    function add_song_option(display_name, song_code, number_of_splits, button_positions, button_dimensions, start_song_function) {
        var style = { font: "16px Arial", align: "center", fill: "#fff", backgroundColor: "#000" };
        var song_name_position = {
            x: game.world.bounds['width'] / 2,
            y: button_positions[0]['h'] - (button_dimensions['h'])
        };
        var song_name_width = game.world.bounds['width'] - 100;
        if (song_name_width > 300) {
            song_name_width = 300;
        }
        var song_name_height = song_name_width / 8;

        var text = game.add.text(song_name_position['x'], song_name_position['y'], display_name, style);
        garbage_collector.add_object(text);
        text.width = song_name_width;
        text.height = song_name_height;
        text.anchor.set(0.5);

        buttons = test.create_buttons(number_of_splits, button_positions, start_song_function);
        adjust_button_dimensions(buttons, button_dimensions);
    }

    function create_song_chart() {
        var number_of_splits = 3;
        var split_dimensions = get_vertical_screen_splits(number_of_splits);
        var split_middle_offset = ((split_dimensions[0]['split_end_coordinate']) / 2);
        var world_dimensions = {
            w: game.world.bounds['width'],
            h: game.world.bounds['height']
        };

        var button_width = (world_dimensions['w'] / 3) - 50;
        if (button_width > 150) {
            button_width = 150;
        }
        var button_height = (button_width / 3);
        var button_dimensions = {
            'w': button_width,
            'h': button_height,
        };

        buttons_vertical_position = world_dimensions['h'] / 8;
        button_positions = calculate_button_positions(buttons_vertical_position, button_dimensions);
        test.add_song_option("Passenger - Let Her Go", "passenger-let_her_go", number_of_splits, button_positions, button_dimensions, function() {
            song.current_song = 'passenger-let_her_go';
            game_state_manager.start_game();
        });

        buttons_vertical_position = buttons_vertical_position + (world_dimensions['h'] / 5.5);
        button_positions = calculate_button_positions(buttons_vertical_position, button_dimensions);
        test.add_song_option("Avicii - The Nights", "avicii-the-nights", number_of_splits, button_positions, button_dimensions, function() {
            song.current_song = 'avicii-the_nights';
            game_state_manager.start_game();
        });

        buttons_vertical_position = buttons_vertical_position + (world_dimensions['h'] / 5.5);
        button_positions = calculate_button_positions(buttons_vertical_position, button_dimensions);
        test.add_song_option("The Script - Breakeven", "the-script-breakeven", number_of_splits, button_positions, button_dimensions, function() {
            song.current_song = 'the-script-breakeven';
            game_state_manager.start_game();
        });

        buttons_vertical_position = buttons_vertical_position + (world_dimensions['h'] / 5.5);
        button_positions = calculate_button_positions(buttons_vertical_position, button_dimensions);
        test.add_song_option("Justin Bieber - Sorry", "justin-bieber-sorry", number_of_splits, button_positions, button_dimensions, function() {
            song.current_song = 'justin-bieber-sorry';
            game_state_manager.start_game();
        });
    }

    return {
        create_buttons: create_buttons,
        add_song_option: add_song_option,
        create_song_chart: create_song_chart,
    }
}

var test = new Test();
