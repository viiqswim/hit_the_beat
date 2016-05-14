var Statistics = function() {
    // numerical statistics
    var note_streak;
    var score_multiplier;
    var score;
    var granular_statistics;

    var user_has_big_streak = false;

    // labels
    var score_number_label;
    var streak_text_label;
    var streak_number_label;
    var accuracy_text_label;
    var accuracy_number_label;
    var multiplier_number_label;
    var multiplier_text_label;

    this.initialize = function initialize(options) {
        init_variables();
    };

    this.get_user_has_big_streak = function() {
        return user_has_big_streak;
    };

    function init_variables(options) {
        note_streak = 0;
        score_multiplier = get_streak_multiplier();
        score = 0;
        granular_statistics = {
            perfect_notes: 0,
            good_notes: 0,
            bad_notes: 0,
            missed_notes: 0
        };
    };

    function get_accuracy() {
        var perfect_notes = granular_statistics['perfect_notes'];
        var good_notes = granular_statistics['good_notes'];
        var bad_notes = granular_statistics['bad_notes'];
        var missed_notes = granular_statistics['missed_notes'];
        var total = perfect_notes + good_notes + bad_notes + missed_notes;

        if (total == 0) {
            return '0';
        }

        var notes_hit = perfect_notes + good_notes + bad_notes;
        var preliminary_percentage = (notes_hit / total) * 100
        var true_percentage = preliminary_percentage.toFixed(0);

        return true_percentage;
    };

    function check_boo_message(note_streak) {
        if (note_streak >= 50) {
            display_encouraging_message("Ouch", "");
        }
    };

    function display_encouraging_message(big_message, small_message) {
        var coords = {
            x: game.world.bounds['width'] / 2,
            y: game.world.bounds['height'] / 4,
        }
        var big_style = { font: '46px Arial', fill: '#fff' }
        var small_style = { font: '12px Arial', fill: '#fff' }

        var big_encourage = game.add.text(coords['x'], coords['y'], big_message, big_style);
        var small_encourage = game.add.text(coords['x'], coords['y'] + 30, small_message, small_style);
        garbage_collector.add_object(big_encourage);
        garbage_collector.add_object(small_encourage);

        big_encourage.anchor.setTo(0.5, 0.5);
        small_encourage.anchor.setTo(0.5, 0.5);

        game.time.events.add(2000, function() {
            game.add.tween(big_encourage).to({ y: 0 }, 1000, Phaser.Easing.Linear.None, true);
            game.add.tween(big_encourage).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
            game.add.tween(small_encourage).to({ y: 0 }, 1000, Phaser.Easing.Linear.None, true);
            game.add.tween(small_encourage).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true);
        }, this);

    };

    function increase_score(hit_type) {
        score += (100 * hit_type) * get_streak_multiplier();
    };

    function get_streak_multiplier() {
        var _note_streak = note_streak;
        if (_note_streak < 20) {
            return 1;
        } else if (_note_streak < 30) {
            return 2;
        } else if (_note_streak < 40) {
            return 3;
        } else if (_note_streak < 50) {
            return 4;
        } else if (_note_streak >= 50) {
            return 8;
        } else {
            return 1;
        }
    };

    function check_display_encouraging_message(note_streak) {
        if (note_streak == 20) {
            // display_encouraging_message("2X", "That all you got?");
        } else if (note_streak == 30) {
            display_encouraging_message("3X", "Not bad");
        } else if (note_streak == 40) {
            display_encouraging_message("4X", "Killing it");
        } else if (note_streak == 50) {
            user_has_big_streak = true;
            note_lanes.change_note_big_streak_color();
            display_encouraging_message("8X", "You're on fire!");
        }
    };

    function interpret_hit_type() {
        switch (last_hit_type) {
            case 0:
                granular_statistics['missed_notes']++;
                return "Miss";
                break;
            case 1:
                granular_statistics['bad_notes']++;
                return "Bad";
                break;
            case 2:
                granular_statistics['good_notes']++;
                return "Good";
                break;
            case 3:
                granular_statistics['perfect_notes']++;
                return "Perfect";
                break;
            case 4:
                return "Godly";
                break;
            default:
                return "?"
                break;
        }
    };

    this.update_statistics = function update_statistics(user_hit_note, hit_type) {
        update_statistics_data(user_hit_note, hit_type);
        update_statistics_text_labels();
    };

    function update_statistics_data(user_hit_note, hit_type) {
        if (user_hit_note) {
            check_display_encouraging_message(note_streak);
            note_streak += 1;
            increase_score(hit_type);
            last_hit_type = hit_type;
        } else {
            check_boo_message(note_streak);
            user_has_big_streak = false;
            note_streak = 0;
            last_hit_type = 0;
        }
    };

    function update_statistics_text_labels() {
        var _note_streak = note_streak.toString();
        var _multiplier = get_streak_multiplier().toString();
        var _score = score.toString();
        var _last_hit_type = interpret_hit_type();
        var _perfect_notes = granular_statistics['perfect_notes'].toString();
        var _good_notes = granular_statistics['good_notes'].toString();
        var _bad_notes = granular_statistics['bad_notes'].toString();
        var _missed_notes = granular_statistics['missed_notes'].toString();
        var _accuracy = get_accuracy().toString();


        score_number_label.setText(_score);
        streak_number_label.setText(_note_streak);
        accuracy_number_label.setText(_accuracy + "");
        multiplier_number_label.setText(_multiplier + "x");
    };

    this.create_display_text = function create_display_text() {
        var coords = {
            x: game.world.bounds['width'] / 2,
            y: 25
        }
        var text_space = 18;
        var side_scores_space = 20;
        var space = (game.world.bounds['width'] / 2) - 30;
        var main_score_style = { font: '32px Arial', fill: '#fff' }
        var side_score_style = { font: '20px Arial', fill: '#fff' }
        var side_text_style = { font: '11px Arial', fill: '#fff' }

        score_number_label = game.add.text(coords['x'], coords['y'], '0', main_score_style);

        streak_number_label = game.add.text(coords['x'] - space, side_scores_space, '0', side_score_style);
        streak_text_label = game.add.text(coords['x'] - space, side_scores_space + text_space, 'Streak', side_text_style);


        accuracy_number_label = game.add.text(coords['x'] + space, side_scores_space, '0', side_score_style);
        accuracy_text_label = game.add.text(coords['x'] + space, side_scores_space + text_space, 'Accuracy', side_text_style);

        multiplier_number_label = game.add.text(coords['x'] - space, side_scores_space + 100, '1x', side_score_style);
        multiplier_text_label = game.add.text(coords['x'] - space, side_scores_space + 100 + text_space, 'Multiplier', side_text_style);

        garbage_collector.add_object(score_number_label);
        garbage_collector.add_object(streak_number_label);
        garbage_collector.add_object(streak_text_label);
        garbage_collector.add_object(accuracy_number_label);
        garbage_collector.add_object(accuracy_text_label);
        garbage_collector.add_object(multiplier_number_label);
        garbage_collector.add_object(multiplier_text_label);
        

        score_number_label.anchor.setTo(0.5, 0.5);
        streak_text_label.anchor.setTo(0.5, 0.5);
        streak_number_label.anchor.setTo(0.5, 0.5);
        accuracy_text_label.anchor.setTo(0.5, 0.5);
        accuracy_number_label.anchor.setTo(0.5, 0.5);
        multiplier_number_label.anchor.setTo(0.5, 0.5);
        multiplier_text_label.anchor.setTo(0.5, 0.5);
    };
}
