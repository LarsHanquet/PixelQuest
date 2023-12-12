import Phaser from 'phaser';
import grassTiles from '../../assets/sprites/tilesets/grass.png';
import plainsTiles from '../../assets/sprites/tilesets/plains.png';
import fenceTiles from '../../assets/sprites/tilesets/fences.png';
import objectTiles from '../../assets/sprites/objects/objects.png';
import decorTiles from '../../assets/sprites/tilesets/decor_16x16.png';
import backgroundMap from '../../assets/map_valley.json';

class Map extends Phaser.Scene{
    constructor(scene, player) {
        super({ key: 'map' }); // Make sure to use a key for the scene
        this.scene = scene;
        this.map = undefined;
        this.tilesets = {};
        this.layers = {};
        this.player = player;
    }

    static preload(scene) {
        scene.load.image('plains', plainsTiles);
        scene.load.image('grass', grassTiles);
        scene.load.image('fence', fenceTiles);
        scene.load.image('object', objectTiles);
        scene.load.image('decor', decorTiles);
        scene.load.tilemapTiledJSON('map', backgroundMap);
    }

    create() {
        this.map = this.scene.make.tilemap({ key: 'map' });

        this.grassTileset = this.map.addTilesetImage('grass', 'grass');
        this.fenceTileset = this.map.addTilesetImage('fences', 'fence');
        this.objectsTileset = this.map.addTilesetImage('objects', 'object');
        this.plainsTileset = this.map.addTilesetImage('plains', 'plains');
        this.decorTileset = this.map.addTilesetImage('decor_16x16', 'decor');

        this.map.createLayer('ground', this.grassTileset, 0, 0);
        this.map.createLayer('decor', this.decorTileset, 0, 0);
        this.fencesLayer = this.map.createLayer('fences', this.fenceTileset, 0, 0);
        this.wallsLayer = this.map.createLayer('walls', this.plainsTileset, 0, 0);
        this.mountainsLayer = this.map.createLayer('mountains', this.plainsTileset, 0, 0);
        this.treesLayer = this.map.createLayer('trees', this.objectsTileset, 0, 0);
        
        

        this.enableCollisions();
    }

    enableCollisions() {
        this.map.setCollisionBetween(0, 100, true, 'fences');
        this.map.setCollisionBetween(0, 100, true, 'walls');
        this.map.setCollisionBetween(0, 100, true, 'mountains');
        this.map.setCollisionBetween(0, 100, true, 'trees');

        this.fencesLayer.setCollisionBetween(2, 16);
        this.wallsLayer.setCollisionBetween(43, 56);
        this.mountainsLayer.setCollisionBetween(43, 56);
        this.treesLayer.setCollisionBetween(194, 227);
        this.scene.physics.add.collider(this.player, this.fencesLayer);
        this.scene.physics.add.collider(this.player, this.wallsLayer);
        this.scene.physics.add.collider(this.player, this.mountainsLayer);
        this.scene.physics.add.collider(this.player, this.treesLayer);
    }
}

export default Map;
