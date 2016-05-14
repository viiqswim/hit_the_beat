var SongGenerator = function() {
    var song_data = [];

    this.initialize = function initialize(song_code) {
        song_data = init_song_data(song_code);
    }

    function remove_top_note() {
        song_data.splice(0, 1);
    }

    function init_song_data(song_code) {
        var raw_notes = song_library.retrieve_song(song_code);
        var processed_notes = [];
        var length = raw_notes.length;

        _.each(raw_notes, function(note, index) {
            processed_notes.push({
                scale: scale(note['scale']),
                timing: note['timing']
            });
        });

        return processed_notes;
    }

    function scale(index) {
        var scale = [
            [1],
            [2],
            [3],
            [1, 2],
            [1, 3],
            [2, 3],
            [1, 2, 3],
            [4]
        ];

        return scale[index];
    }

    this.play_next_song_note = function play_next_song_note() {
        if (song_data.length == 0) {
            return;
        }

        var self = this;
        var current_note = song_data[0];
        game.time.events.add(current_note['timing'], handle_note_creation, this, current_note);
    }

    function handle_note_creation(current_note) {
        create_note_in_correct_lane(current_note);
        remove_top_note();
        this.play_next_song_note();
    }

    function create_note_in_correct_lane(current_note) {
        var self = this;
        var scales = current_note['scale'];
        _.each(scales, function(scale, index) {
            if (scale == 1) {
                lane_1_balls.push(create_ball(0, button_positions, colors['note_colors']['green']));
            } else if (scale == 2) {
                lane_2_balls.push(create_ball(1, button_positions, colors['note_colors']['red']));
            } else if (scale == 3) {
                lane_3_balls.push(create_ball(2, button_positions, colors['note_colors']['blue']));
            } else if (scale == 4) {
                lane_1_balls.push(create_ball(0, button_positions, colors['white']));
            }
        });
    }
};