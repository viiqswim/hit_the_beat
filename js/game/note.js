var Note = function() {
    var note;

    this.initialize = function initialize(lane_number) {
        var note_color = get_note_color();
        note = create_note(lane_number, button_positions);

        return this;
    };

    this.get_note = function get_note() {
        return note;
    };

    this.note_hit = function note_hit(hit_type) {
        statistics.update_statistics(true, hit_type);
    };

    this.note_miss = function note_miss() {
        note_lanes.change_note_regular_color();
        statistics.update_statistics(false);
    };

    this.destroy = function destroy() {
        var note_coords = get_center_coords(note.getBounds());
        note.destroy();
        emitters.particleBurst(note_coords);
    };

    function get_note_color(lane_number) {
        if (statistics.get_user_has_big_streak()) {
            return colors['gold'];
        } else if (lane_number == 0) {
            return colors['note_colors']['green'];
        } else if (lane_number == 1) {
            return colors['note_colors']['red'];
        } else if (lane_number == 2) {
            return colors['note_colors']['blue'];
        }
    };

    function create_note(lane_number, lane_positions) {
        var button_coordinates = get_center_coords(tappers[0].getBounds());
        var note_color = get_note_color(lane_number);
        var note = game.add.sprite(
            lane_positions[lane_number]['w'],
            button_coordinates['y'] - 600,
            'football'
        );

        garbage_collector.add_object(note);

        note.anchor.set(0.5);
        note.tint = note_color;

        game.physics.enable(note, Phaser.Physics.ARCADE);
        note.body.velocity.y = 500;
        note.body.checkCollision.down = true;

        return note;
    };
}
