import { Depth } from "../../../../enums/depth.enum";
import { Entity } from "../../../entity";
import { CannonBullet } from "../../../objects/cannon-bullet";

export class Cannon extends Entity {

    private readonly hp = 50;
    private woodCollider;
    private playerBulletCollider;
    private exploding = false;
    private bullets: Phaser.GameObjects.Group;
    private bullet: Phaser.GameObjects.Sprite;
    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key, type);
        this.createAnims();
        this.collide();
        this.setDepth(Depth.Eniemies)
        //@ts-ignore
        this.body.setImmovable(true);
        this.bullets = this.scene.add.group();
        setInterval(()=> {
            this.shot();
        },1000);

    }

    private createAnims(): void {
        this.anims.create({
            key: 'cannon_shot',
            frames: this.anims.generateFrameNumbers('cannon', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: 1
        });
        this.anims.create({
            key: 'cannon_explode',
            frames: this.anims.generateFrameNumbers('cannon', { start: 6, end: 11 }),
            frameRate: 10,
            repeat: 0
        });
    }

    private collide(): void {
        //@ts-ignore
        this.woodCollider = this.scene.physics.add.collider(this, this.scene.layers.woodCollisionLayer, null)
    }

    addPlayerBulletCollide(bullet): void {
        if (this.hp > 0) {
            //@ts-ignore
            this.scene.physics.add.collider(this, bullet, () => {
                //@ts-ignore
                this.hp -= this.scene.player.dmg;

                bullet.destroy();
                if (this.hp <= 0 && this.exploding === false) this.isDead();
            });
        }
    }

    private isDead(): void {
        this.exploding = true;
        console.log('explode')
        this.anims.play('cannon_explode').on('animationcomplete', () => {
                    this.destroy();

        });
    }

    private shot(): void {
        const x = Phaser.Math.Clamp(this.x , 0, Phaser.Math.MAX_SAFE_INTEGER);
        const y = Phaser.Math.Clamp(this.y, 0, 600);
        const bullet = new CannonBullet(     
            this.scene,
            x,
            y,
            'cannon_bullet',
            'bullet',);
            bullet.fire();
        this.bullets.add(bullet);    
    }
}