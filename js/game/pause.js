var Pause = function() {
    var resume_label;
    var pause_click_area;
    var quit_label;

    this.initialize = function initialize() {
        paused_label = null;
        resume_label = null;
        pause_click_area = null;
    }

    this.create_pause_click_area = function create_pause_click_area() {
        _create_pause_click_area();
    };

    function _create_pause_click_area() {
        pause_click_area = game.add.sprite(0, 0);
        pause_click_area.width = game.world.bounds['width'];
        pause_click_area.height = game.world.bounds['height'] * 0.66;
        pause_click_area.inputEnabled = true;
        pause_click_area.events.onInputUp.add(pause);

        garbage_collector.add_object(pause_click_area);
    }

    function pause() {
        var self = this;

        if (game.paused) {
            return;
        }

        pause_click_area.destroy();
        game.paused = true;
        song.pause_song();

        add_resume_button();
        add_quit_button();
        game.input.onDown.add(pause_menu_events, self);
    };

    // And finally the method that handels the pause menu
    function pause_menu_events(event, self) {
        var device_width = game.world.bounds['width'];
        var device_height = game.world.bounds['height'];
        // Only act if paused
        if (!game.paused) {
            return;
        }

        if (is_in_range(event.position, quit_label)) {
            quit_game();
        } else if (is_in_range(event.position, resume_label)) {
            resume_game();
        }
    };

    function quit_game() {
        game.paused = false;
        game_state_manager.start_menu();
    }

    function resume_game() {
        destroy_paused_menu();

        // Unpause the game
        game.paused = false;
        song.resume_song();
        _create_pause_click_area();
    }

    function add_resume_button() {
        var device_width = game.world.bounds['width'];
        var device_height = game.world.bounds['height'];
        var text_width;

        if (device_width < 500) {
            text_width = (device_width / 2);
        } else {
            text_width = 500;
        }

        var style = { font: '30px Arial', fill: '#fff' };
        resume_label = game.add.text(device_width / 2, (device_height / 2) - 40, 'Resume', style);
        resume_label.anchor.setTo(0.5, 0.5);
        resume_label.width = text_width;
        garbage_collector.add_object(resume_label);
    };

    function add_quit_button() {
        var device_width = game.world.bounds['width'];
        var device_height = game.world.bounds['height'];
        var text_width;

        if (device_width < 500) {
            text_width = device_width / 2;
        } else {
            text_width = 500;
        }

        var style = { font: '30px Arial', fill: '#fff' };
        quit_label = game.add.text(device_width / 2, (device_height / 2) + 20, 'Quit Song', style);
        quit_label.anchor.set(0.5);
        quit_label.width = text_width;
        garbage_collector.add_object(quit_label);
    };

    function destroy_paused_menu() {
        resume_label.destroy();
        quit_label.destroy();
    }
};
