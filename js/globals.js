var colors = {
    black: 0x000000,
    white: 0xFFFFFF,
    green: 0x4cff00,
    yellow: 0xccff00,
    orange: 0xffb300,
    red: 0xff3300,
    gold: 0xFFD700,
    note_colors: {
        green: 0x009933,
        red: 0xFF3300,
        blue: 0x0099ff,
    }
};

var tappers = [];
var invisible_tappers = [];

var create = new Create();
var pause = new Pause();
var preload = new Preload();
var song = new Song();
var song_generator = new SongGenerator();
var song_library = new SongLibrary();
var statistics = new Statistics();
var tapper = new Tapper();
var update = new Update();
var user_input = new UserInput();
var loading_screen = new LoadingScreen();
var note_lanes = new NoteLanes();
var emitters = new Emitters();
var game_state_manager = new GameStateManager();
var garbage_collector = new GarbageCollector();
var test = new Test();