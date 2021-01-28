export class Enitty extends Phaser.GameObjects.Sprite{
    
    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 1);
        this.setData("type", type);
        this.setData("isDead", false);
    }   


}