var Update = function() {

    this.initialize = function initialize() {
        remove_missed_notes();
    };

    function remove_missed_notes() {
        if (tappers.length !== 0) {
            tapper.remove_missed_notes(note_lanes.get_lane_1(), tappers[0]);
            tapper.remove_missed_notes(note_lanes.get_lane_2(), tappers[1]);
            tapper.remove_missed_notes(note_lanes.get_lane_3(), tappers[2]);
        }
    };
};