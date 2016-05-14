function layout() {
    var number_of_splits = 3;
    var split_dimensions = get_vertical_screen_splits(number_of_splits);
    var split_middle_offset = ((split_dimensions[0]['split_end_coordinate']) / 2);
    var world_dimensions = {
        w: game.world.bounds['width'],
        h: game.world.bounds['height']
    };
    var button_dimensions = {
        'w': 85,
        'h': 75,
    };
    var tappers_vertical_position = world_dimensions['h'] - (world_dimensions['h'] / 7);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    set_full_screen();

    set_background(world_dimensions);

    statistics.create_display_text();

    button_positions = calculate_button_positions(tappers_vertical_position, button_dimensions);

    tappers = create_tappers(number_of_splits, button_positions);
    invisible_tappers = create_invisible_tappers(number_of_splits, button_positions);

    adjust_button_dimensions(tappers, button_dimensions);
}

function set_full_screen() {
    const SAFE_ZONE_WIDTH = 2048;
    const SAFE_ZONE_HEIGHT = 1365;
    var lGameScale = Math.round(10000 * Math.min(game.width / SAFE_ZONE_WIDTH, game.height / SAFE_ZONE_HEIGHT)) / 10000;
    var world = game.add.group();
    world.scale.setTo(lGameScale, lGameScale);
    world.x = (game.width - SAFE_ZONE_WIDTH * lGameScale) / 2;
    world.y = (game.height - SAFE_ZONE_HEIGHT * lGameScale) / 2;
}

function set_background(world_dimensions) {
    game.stage.backgroundColor = '#182d3b';
    background = game.add.tileSprite(0, 0, world_dimensions['w'], world_dimensions['h'], 'background');

    return background;
}

function get_vertical_screen_splits(number_of_splits) {
    var world_bounds = game.world.bounds;
    var split_width = world_bounds['width'] / number_of_splits;
    var splits = [];

    if (split_width > 200) {
        return get_vertical_big_screen_splits(number_of_splits);
    }

    for (var i = 0; i < number_of_splits; i++) {
        var split = {
            split_end_coordinate: (i + 1) * split_width
        };
        splits.push(split);
    }

    return splits;
}

function get_vertical_big_screen_splits() {
    var world_bounds = game.world.bounds;
    var middle_split = world_bounds['width'] / 2;
    var split_width = 150;
    var splits = [];

    splits[0] = {
        split_end_coordinate: middle_split - split_width
    };
    splits[1] = {
        split_end_coordinate: middle_split
    };
    splits[2] = {
        split_end_coordinate: middle_split + split_width
    };

    return splits;
}

function calculate_button_positions(tappers_vertical_position, button_dimensions) {
    var world_bounds = game.world.bounds;
    var middle_split = world_bounds['width'] / 2;
    var offset = button_dimensions['w'] + (button_dimensions['w'] / 3);
    var button_positions = [];

    button_positions[0] = {
        'w': middle_split - offset,
        'h': tappers_vertical_position
    }

    button_positions[1] = {
        'w': middle_split,
        'h': tappers_vertical_position
    }

    button_positions[2] = {
        'w': middle_split + offset,
        'h': tappers_vertical_position
    }

    return button_positions;
}

function create_tappers(number_of_splits, button_positions) {
    var tappers = [];

    tappers.push(
        game.add.button(button_positions[0]['w'], button_positions[0]['h'],
            'tapper_white', null, this)
    );
    tappers.push(
        game.add.button(button_positions[1]['w'], button_positions[1]['h'],
            'tapper_white', null, this)
    );
    tappers.push(
        game.add.button(button_positions[2]['w'], button_positions[2]['h'],
            'tapper_white', null, this)
    );


    for (var i = 0; i < tappers.length; i++) {
        tappers[i].anchor.set(0.5);
        tappers[i].tint = colors['white'];
    }

    return tappers;
}

function create_invisible_tappers(number_of_splits, button_positions) {
    var invisible_tappers = [];

    invisible_tappers.push(
        game.add.sprite(button_positions[0]['w'], button_positions[0]['h'])
    );
    invisible_tappers.push(
        game.add.sprite(button_positions[1]['w'], button_positions[1]['h'])
    );
    invisible_tappers.push(
        game.add.sprite(button_positions[2]['w'], button_positions[2]['h'])
    );

    for (var i = 0; i < tappers.length; i++) {
        invisible_tappers[i].anchor.set(0.5);
        // tapper radius should be bigger than the target so that
        // people don't miss it so easily
        invisible_tappers[i].width = 120;
        invisible_tappers[i].height = 150;
    }

    return invisible_tappers;
}

function adjust_button_dimensions(tappers, button_dimensions) {
    for (var i = 0; i < tappers.length; i++) {
        tappers[i].width = button_dimensions['w'];
        tappers[i].height = button_dimensions['h'];
    }
}
