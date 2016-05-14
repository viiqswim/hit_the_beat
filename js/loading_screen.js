var LoadingScreen = function() {
    var loading_text;

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

    this.destroy_loading_screen = function destroy_loading_text() {
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
}