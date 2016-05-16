function get_center_coords(coordinates) {
    return {
        x: Math.floor(coordinates['x'] + coordinates.width / 2),
        y: Math.floor(coordinates['y'] + coordinates.height / 2),
    }
}

function is_in_range(pointer_coords, asset) {
    var a_width = asset.width;
    var a_height = asset.height;
    var bounds = asset.getBounds();
    var top = bounds['y'];
    var left = bounds['x'];
    var bottom = bounds['y'] + a_height;
    var right = bounds['x'] + a_width;

    if (pointer_coords['x'] >= left && pointer_coords['x'] <= right && pointer_coords['y'] >= top && pointer_coords['y'] <= bottom) {
        return true;
    }

    return false;
}

function remove_missed_notes() {
    if (note_lanes.get_lane_1().length !== 0) {
        tapper.remove_missed_notes(note_lanes.get_lane_1(), tappers[0]);
    }
    if (note_lanes.get_lane_2().length !== 0) {
        tapper.remove_missed_notes(note_lanes.get_lane_2(), tappers[1]);
    }
    if (note_lanes.get_lane_3().length !== 0) {
        tapper.remove_missed_notes(note_lanes.get_lane_3(), tappers[2]);
    }
};
