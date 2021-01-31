export interface Layer{
    groundLayer?: Phaser.Tilemaps.TilemapLayer;
    grassLayer?: Phaser.Tilemaps.TilemapLayer;
    treesLayer?: Phaser.Tilemaps.TilemapLayer;
    treesGrassLayer?: Phaser.Tilemaps.TilemapLayer;
    treesBackLayer?: Phaser.Tilemaps.TilemapLayer;
    woodLayer?: Phaser.Tilemaps.TilemapLayer;
    woodCollisionLayer?: Phaser.Tilemaps.TilemapLayer;
    decorativeLayer?: Phaser.Tilemaps.TilemapLayer;
}