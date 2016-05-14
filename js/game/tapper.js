var Tapper = function() {
    var possible_

    function lane_1_button_press() {
        handle_tapper_press(lane_1_balls, tappers[0]);
    }

    function lane_2_button_press() {
        handle_tapper_press(lane_2_balls, tappers[1]);
    }

    function lane_3_button_press() {
        handle_tapper_press(lane_3_balls, tappers[2]);
    }

    function handle_tapper_press(lane_notes, tapper) {
        var tapper_coords = get_center_coords(tapper.getBounds());
        var note_index = 0;
        var note;
        var note_coords;

        if (lane_notes.length == 0) {
            handle_missed_note(tapper);
            return;
        }

        note = lane_notes[note_index];
        note_coords = get_center_coords(note.getBounds());

        var hit_type = get_hit_type(note_coords, tapper_coords, tapper);
        if (hit_type !== 0) {
            note.destroy();
            lane_notes.splice(0, 1);
            statistics.note_hit(hit_type);
            particleBurst(note_coords);
        } else {
            handle_missed_note(tapper);
        }
    }

    function remove_missed_notes(lane_notes, tapper) {
        var tapper_coords = get_center_coords(tapper.getBounds());


        _.each(lane_notes, function(note) {
            if (note === null || note === undefined) {
                return;
            }

            note_coords = get_center_coords(note.getBounds());

            exeeds = exeeds_possible_hit_boundary(note_coords, tapper_coords);
            if (exeeds) {
                handle_missed_note(tapper);
                lane_notes.splice(0, 1);
            } else {
                return;
            }
        });
    }

    function exeeds_possible_hit_boundary(note_coords, tapper_coords) {
        if ((tapper_coords['y'] + 56) < note_coords['y']) {
            return true;
        }

        return false;
    }

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
    }

    function handle_missed_note(tapper) {
        statistics.note_miss();
        change_tapper_color(colors['red'], tapper);
    }

    function change_tapper_color(color, tapper) {
        tapper.tint = color;
    }

    return {
        lane_1_button_press: lane_1_button_press,
        lane_2_button_press: lane_2_button_press,
        lane_3_button_press: lane_3_button_press,
        remove_missed_notes: remove_missed_notes,
        get_hit_type: get_hit_type,

    }
};