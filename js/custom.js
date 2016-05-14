function get_center_coords(coordinates) {
    return {
        x: Math.floor(coordinates['x'] + coordinates.width / 2),
        y: Math.floor(coordinates['y'] + coordinates.height / 2),
    }
}

function is_in_range(coords, asset) {
	var a_width = asset.width;
	var a_height = asset.height;
	var bounds = asset.getBounds();
	var top = bounds['y'];
	var left = bounds['x'];
	var bottom = bounds['y'] + a_height;
	var right = bounds['x'] + a_width;

	if(coords['x'] >= left && coords['x'] <= right && coords['y'] >= top && coords['y'] <= bottom) {
		return true;
	}

	return false;
}