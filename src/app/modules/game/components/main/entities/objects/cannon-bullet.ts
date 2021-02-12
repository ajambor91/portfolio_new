import { BulletClass } from "./bullet-class";

export class CannonBullet extends BulletClass {

    private collider;
    private exploding = false;
    private turn: number;

    constructor(scene, xPosition, yPostion, turn, key, type) {
        super(scene, xPosition, yPostion, key, type);
        //@ts-ignore
        this.body.allowGravity = true;
        this.turn = turn;
        this.body.velocity.x = -700;
        this.body.velocity.y = -700;
        this.createAnims();
        this.setAngle(turn)
        console.log('posito',xPosition,yPostion)
    }
    fire(): void {
        //@ts-ignore
        this.scene.physics.velocityFromRotation(this.turn, -550, this.body.velocity)
        this.anims.play('fire');
    }
    explode(): void {
        this.anims.play('explode');
        this.body.velocity.x = -200
    }
    private createAnims(): void {
        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('cannon_bullet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('cannon_bullet', { start: 1, end: 3 }),
            frameRate: 7,
            repeat: 0
        });
    }

    protected addWorldCollide(): void {
        //@ts-ignore
        this.collider = this.scene.physics.add.collider(this, this.scene.layers.groundLayer, () => {
            if (this.exploding === false) {
                this.exploding = true;
                this.body.velocity.x = 0;
                this.anims.play('explode',).on('animationcomplete', () => {
                    this.scene.physics.world.removeCollider(this.collider);
                    this.destroy();
                });
            }

        });
    }


}