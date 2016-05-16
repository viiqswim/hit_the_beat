var NoteLanes = function() {
    var lane_1 = [];
    var lane_2 = [];
    var lane_3 = [];

    this.initialize = function initialize() {
        lane_1 = [];
        lane_2 = [];
        lane_3 = [];
    }

    this.get_lane_1 = function() {
        return lane_1;
    };

    this.get_lane_2 = function() {
        return lane_2;
    };

    this.get_lane_3 = function() {
        return lane_3;
    };

    this.set_lane_1 = function(_lane) {
        lane_1 = _lane;
    };

    this.set_lane_2 = function(_lane) {
        lane_2 = _lane;
    };

    this.set_lane_3 = function(_lane) {
        lane_3 = _lane;
    };

    this.change_note_regular_color = function change_note_regular_color() {
        change_lane_notes_color(lane_1, colors['note_colors']['green']);
        change_lane_notes_color(lane_2, colors['note_colors']['red']);
        change_lane_notes_color(lane_3, colors['note_colors']['blue']);
    };

    this.change_note_big_streak_color = function change_note_big_streak_color() {
        change_lane_notes_color(lane_1, colors['gold']);
        change_lane_notes_color(lane_2, colors['gold']);
        change_lane_notes_color(lane_3, colors['gold']);
    };

    function change_lane_notes_color(lane_balls, color) {
        _.each(lane_balls, function(ball) {
            ball.get_note().tint = color;
        });
    };
};
