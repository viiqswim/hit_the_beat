var Update = function() {

    this.initialize = function initialize() {
        remove_missed_notes();
        check_user_has_big_streak();
    };

    function remove_missed_notes() {
        if (tappers.length !== 0) {
            tapper.remove_missed_notes(lane_1_balls, tappers[0]);
            tapper.remove_missed_notes(lane_2_balls, tappers[1]);
            tapper.remove_missed_notes(lane_3_balls, tappers[2]);
        }
    }

    function check_user_has_big_streak() {
        if (user_has_big_streak) {
            change_lane_notes_color(lane_1_balls, colors['gold']);
            change_lane_notes_color(lane_2_balls, colors['gold']);
            change_lane_notes_color(lane_3_balls, colors['gold']);
        } else {
            change_lane_notes_color(lane_1_balls, colors['note_colors']['green']);
            change_lane_notes_color(lane_2_balls, colors['note_colors']['red']);
            change_lane_notes_color(lane_3_balls, colors['note_colors']['blue']);
        }
    }


    function change_lane_notes_color(lane_balls, color) {
        _.each(lane_balls, function(ball) {
            ball.tint = color;
        });
    }
};