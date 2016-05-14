var Tapper = function() {
    this.lane_1_button_press = function lane_1_button_press() {
        handle_tapper_press(note_lanes.get_lane_1(), tappers[0]);
    };

    this.lane_2_button_press = function lane_2_button_press() {
        handle_tapper_press(note_lanes.get_lane_2(), tappers[1]);
    };

    this.lane_3_button_press = function lane_3_button_press() {
        handle_tapper_press(note_lanes.get_lane_3(), tappers[2]);
    };

    function handle_tapper_press(lane_notes, tapper) {
        var tapper_coords = get_center_coords(tapper.getBounds());
        var note_index = 0;
        var note;
        var note_coords;

        if (lane_notes.length == 0) {
            handle_missed_note(null, tapper);
            return;
        }

        note = lane_notes[note_index];
        note_coords = get_center_coords(note.get_note().getBounds());

        var hit_type = get_hit_type(note_coords, tapper_coords, tapper);
        if (hit_type !== 0) {
            note.note_hit(hit_type);
            note.destroy();
            lane_notes.splice(0, 1);
        } else {
            handle_missed_note(note, tapper);
        }
    };

    this.remove_missed_notes = function remove_missed_notes(lane_notes, tapper) {
        var tapper_coords = get_center_coords(tapper.getBounds());


        _.each(lane_notes, function(note) {
            if (note === null || note === undefined) {
                return;
            }

            note_coords = get_center_coords(note.get_note().getBounds());

            exeeds_boundary = exeeds_possible_hit_boundary(note_coords, tapper_coords);
            if (exeeds_boundary) {
                handle_missed_note(note, tapper);
                lane_notes.splice(0, 1);
            } else {
                return;
            }
        });
    };

    function exeeds_possible_hit_boundary(note_coords, tapper_coords) {
        if (note_coords['y'] > (tapper_coords['y'] + 56)) {
            return true;
        }

        return false;
    };

    function get_hit_type(note_coords, tapper_coords, tapper) {
        if (note_coords['y'] >= (tapper_coords['y'] - 15) && note_coords['y'] <= (tapper_coords['y'] + 15)) {
            change_tapper_color(colors['green'], tapper);
            return 3;
        } else if (note_coords['y'] >= (tapper_coords['y'] - 36) && note_coords['y'] <= (tapper_coords['y'] + 36)) {
            change_tapper_color(colors['yellow'], tapper);
            return 2;
        } else if (note_coords['y'] >= (tapper_coords['y'] - 56) && note_coords['y'] <= (tapper_coords['y'] + 56)) {
            change_tapper_color(colors['orange'], tapper);
            return 1;
        } else {
            return 0
        }
    };

    function handle_missed_note(note, tapper) {
        if(note === null || note === undefined) {
            statistics.update_statistics(false);
            return;
        }

        note.note_miss();
        change_tapper_color(colors['red'], tapper);
    };

    function change_tapper_color(color, tapper) {
        tapper.tint = color;
    };
};