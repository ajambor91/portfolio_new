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
        this.setOrigin(.5,.5)
            .setSize(10, 150);
        //@ts-ignore
        this.body.setOffset(100,0)
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
        const turn = this.calcRotation();
        this.setRotation(turn);
        console.log(this.displayOriginX)
        const turnX = (this.x * Math.atan(turn));
        console.log('turnx',turnX, this.x)
        const xl = 150

        const xMove = (this.x) - this.height /2   * Math.cos(turn);
        const yMove = this.y  - this.height / 2 * Math.sin(turn);
        console.log('xmove', xMove, this.x)
        const sqrt = Math.sqrt(Math.pow(xMove,2) )
        const x = Phaser.Math.Clamp(xMove, 0, Phaser.Math.MAX_SAFE_INTEGER);
        const y = Phaser.Math.Clamp(yMove, 0, 600);
        const bullet = new CannonBullet(     
            this.scene,
            x,
            y,
            turn,
            'cannon_bullet',
            'bullet',);
            bullet.fire();
        this.bullets.add(bullet);    
    }

    private calcRotation(): number {
                //@ts-ignore
                const correction = this.scene.gameHeight - this.scene.player.y - this.scene.player.width;
                //@ts-ignore 
                const distance = Phaser.Math.Distance.Between(this.scene.player.x - correction, 0, this.x, 0);
                //@ts-ignore
                let angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.player.x,this.scene.player.y)
                //@ts-ignore
                const distanceX = Phaser.Math.Distance.Between( this.scene.player.x ,this.scene.player.y , this.x, this.y);
                //@ts-ignore
                const vector = Math.sqrt(600*600)
                const atan = distance / distanceX;
                //@ts-ignore
                const correctionPlayer = this.scene.player.height * 1.75;
        
                //@ts-ignore
                const arcsin = Math.acos(this.scene.physics.world.gravity.y * (distanceX - correctionPlayer)  / Math.pow(vector,2))

                return arcsin;
    }
}