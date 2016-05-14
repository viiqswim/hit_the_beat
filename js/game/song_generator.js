var SongGenerator = function() {
    var song_data = [];

    this.initialize = function initialize(song_code) {
        song_data = init_song_data(song_code);
    };

    this.play_next_song_note = function play_next_song_note() {
        if (song_data.length == 0) {
            return;
        }

        var self = this;
        var current_note = song_data[0];
        var timing_offset = 0.27;
        game.time.events.add(current_note['timing'] + timing_offset, handle_note_creation, this, current_note);
    };

    function remove_top_note() {
        song_data.splice(0, 1);
    };

    function init_song_data(song_code) {
        var raw_notes = song_library.retrieve_song(song_code);
        var processed_notes = [];

        _.each(raw_notes, function(note) {
            processed_notes.push({
                scale: scale(note['scale']),
                timing: note['timing']
            });
        });

        return processed_notes;
    };

    function scale(index) {
        var scale = [
            [1],
            [2],
            [3],
            [1, 2],
            [1, 3],
            [2, 3],
            [1, 2, 3]
        ];

        return scale[index];
    };

    function handle_note_creation(current_note) {
        create_note_in_correct_lane(current_note);
        remove_top_note();
        this.play_next_song_note();
    };

    function create_note_in_correct_lane(current_note) {
        var self = this;
        var scales = current_note['scale'];
        _.each(scales, function(scale, index) {
            var note = new Note();
            if (scale == 1) {
                note_lanes.get_lane_1().push(note.initialize(0));
            } else if (scale == 2) {
                note_lanes.get_lane_2().push(note.initialize(1));
            } else if (scale == 3) {
                note_lanes.get_lane_3().push(note.initialize(2));
            }
        });
    };
};