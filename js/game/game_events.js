function create_ball(lane, lane_positions, color) {
    var button_coordinates = get_center_coords(tappers[0].getBounds());
    var ball = game.add.sprite(
        lane_positions[lane]['w'],
        button_coordinates['y'] - 600,
        'football'
    );
    ball.anchor.set(0.5);
    ball.tint = color;

    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.y = 500;
    ball.body.checkCollision.down = true;

    return ball;
}

function particleBurst(coordinates) {

    emitter.x = coordinates['x'];
    emitter.y = coordinates['y'];

    emitter.gravity = 200;
    emitter.start(true, 300, 0, 15);
}
