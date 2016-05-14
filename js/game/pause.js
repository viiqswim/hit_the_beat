var Pause = function() {
    var paused_label;
    var pause_details_label;
    this.pause_click_area;

    this.create_pause_button = function create_pause_button() {
        this.pause_click_area = game.add.sprite(0, 0);
        this.pause_click_area.width = game.world.bounds['width'];
        this.pause_click_area.height = game.world.bounds['height'] * 0.66;
        garbage_collector.add_object(this.pause_click_area);
    };

    this.handle_pause_attempt = function handle_pause_attempt() {
        if (game.paused) {
            unpause(this);
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
        song.pause();
        // Then add the menu
        paused_label = game.add.text(device_width / 2, device_height / 2,
            'Paused', { font: '24px Arial', fill: '#fff' });
        paused_label.anchor.setTo(0.5, 0.5);
        garbage_collector.add_object(paused_label);

        // Add detail text
        pause_details_label = game.add.text(device_width / 2, (device_height / 2) + 100, 'Tap anywhere to resume', { font: '30px Arial', fill: '#fff' });
        pause_details_label.width = text_width;
        pause_details_label.anchor.setTo(0.5, 0.5);
    };

    // And finally the method that handels the pause menu
    function unpause(self) {
        var device_width = game.world.bounds['width'];
        var device_height = game.world.bounds['height'];
        // Only act if paused
        if (game.paused) {
            paused_label.destroy();
            pause_details_label.destroy();

            // Unpause the game
            game.paused = false;
            self.pause_click_area.visible = true;
            song.resume();
        }
    };
};
