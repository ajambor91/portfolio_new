export class Entity extends Phaser.GameObjects.Sprite{
    
    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key);
        this.scene = scene;
        this.scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }   


}