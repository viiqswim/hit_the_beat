var UserInput = function() {
    this.register_keys = function register_keys() {
        //  Register the keys.
        this.a_key = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.s_key = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.d_key = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.j_key = game.input.keyboard.addKey(Phaser.Keyboard.J);
        this.k_key = game.input.keyboard.addKey(Phaser.Keyboard.K);
        this.l_key = game.input.keyboard.addKey(Phaser.Keyboard.L);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Attach methods to key events
        this.a_key.onDown.add(tapper.lane_1_button_press, this);
        this.s_key.onDown.add(tapper.lane_2_button_press, this);
        this.d_key.onDown.add(tapper.lane_3_button_press, this);
        this.j_key.onDown.add(tapper.lane_1_button_press, this);
        this.k_key.onDown.add(tapper.lane_2_button_press, this);
        this.l_key.onDown.add(tapper.lane_3_button_press, this);

        // Stop the following keys from propagating up to the browser
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.A,
            Phaser.Keyboard.S,
            Phaser.Keyboard.D,
            Phaser.Keyboard.J,
            Phaser.Keyboard.K,
            Phaser.Keyboard.L,
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT
        ]);
    };

    this.handle_mobile_events = function handle_mobile_events() {
        game.input.onDown.add(handle_tap_event, this);
    };

    function handle_tap_event(pointer) {
        if (is_in_range(pointer.position, invisible_tappers[0])) {
            tapper.lane_1_button_press();
        } else if (is_in_range(pointer.position, invisible_tappers[1])) {
            tapper.lane_2_button_press();
        } else if (is_in_range(pointer.position, invisible_tappers[2])) {
            tapper.lane_3_button_press();
        }
    };
};