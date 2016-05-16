var Pause = function() {
    var paused_label;
    var pause_details_label;
    this.pause_click_area;

    this.initialize = function initialize() {
        paused_label = null;
        pause_details_label = null;
        this.pause_click_area = null;
    }

    this.create_pause_button = function create_pause_button() {
        this.pause_click_area = game.add.sprite(0, 0);
        this.pause_click_area.width = game.world.bounds['width'];
        this.pause_click_area.height = game.world.bounds['height'] * 0.66;
        garbage_collector.add_object(this.pause_click_area);
    };

    this.handle_pause_attempt = function handle_pause_attempt() {
        if (game.paused) {
            game.paused = false;
            // game_state_manager.start_menu();
            // unpause(this);
        } else {
            pause();
        }
    };

    function pause() {
        var device_width = game.world.bounds['width'];
        var device_height = game.world.bounds['height'];
        var text_width;

        if (device_width < 500) {
            text_width = device_width - 50;
        } else {
            text_width = 500;
        }
        // When the paus button is pressed, we pause the game
        game.paused = true;
        // Pause the music too
        song.pause_song();
        // Then add the menu
        paused_label = game.add.text(device_width / 2, device_height / 2,
            'Paused', { font: '24px Arial', fill: '#fff' });
        paused_label.anchor.setTo(0.5, 0.5);
        garbage_collector.add_object(paused_label);

        add_quit_button();

        // // Add detail text
        // pause_details_label = game.add.text(device_width / 2, (device_height / 2) + 100, 'Tap anywhere to resume', { font: '30px Arial', fill: '#fff' });
        // pause_details_label.width = text_width;
        // pause_details_label.anchor.setTo(0.5, 0.5);
    };

    // And finally the method that handels the pause menu
    function unpause(self) {
        var device_width = game.world.bounds['width'];
        var device_height = game.world.bounds['height'];
        // Only act if paused
        if (game.paused) {
            // paused_label.destroy();
            // pause_details_label.destroy();

            // Unpause the game
            game.paused = false;
            self.pause_click_area.visible = true;
            song.resume();
        }
    };

    function add_quit_button() {
        addMenuOption('Quit Game', function(e) {
            game.paused = false;
            game_state_manager.start_menu();
        });
    };


    function addMenuOption(text, callback) {
        var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
        var txt = game.add.text(game.world.centerX, game.world.centerY - 50, text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        var onOver = function(target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };
        var onOut = function(target) {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount++;
    };
};
