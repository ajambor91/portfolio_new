import { Depth } from "../../../../enums/depth.enum";
import { Entity } from "../../../entity";
import { Anim } from "../../../objects/anim";
import { CannonBullet } from "../../../objects/cannon-bullet";

export class Cannon extends Entity {

    private readonly hp = 500;
    private readonly bulletSpeed = 700;
    private exploding = false;
    private bullets: Phaser.GameObjects.Group;
    private shotInterval;
    private basis: Phaser.GameObjects.Image;

    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key, type);
        // this.collide();
        this.setDepth(Depth.Cannon)
        //@ts-ignore
        this.body.setImmovable(true);
        //@ts-ignore
        this.body.allowGravity = false;
        this.bullets = this.scene.add.group();
        this.createAnims();
        this.shotInterval = setInterval(() => {
            this.shot();
        }, 1000);
        this.setOrigin(1, .5)
            .setSize(10, 150);
        //@ts-ignore
        this.body.setSize(50, 270).setOffset(160, -150)
        this.createBasis();
    }

    addPlayerBulletCollide(bullet): void {
        if (this.hp > 0) {
            //@ts-ignore
            this.scene.physics.add.collider(this, bullet, () => {
                //@ts-ignore
                this.hp -= this.scene.player.dmg;
                this.scene.sound.play('bullet_metal');
                bullet.destroy();
                if (this.hp <= 0 && this.exploding === false) this.isDead();
            });
        }
    }

    private createAnims(): void {
        this.anims.create({
            key: 'cannon_explode',
            frames: this.anims.generateFrameNumbers('cannon', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    private isDead(): void {
        //@ts-ignore
        this.scene.sounds.burning.play();
        //@ts-ignore
        this.scene.sounds.burning.setLoop(true);
        //@ts-ignore
        this.scene.sounds.metalScreech.play();
        clearInterval(this.shotInterval);
        let degrees = this.rotation * (180 / Math.PI);
        const rotate = setInterval(() => {
            this.setAngle(degrees);
            degrees--;
            if (degrees <= -30) {
                clearInterval(rotate);
            }
        })
        this.exploding = true;
        this.anims.play('cannon_explode');
    }

    private shot(): void {
        const turn = this.calcRotation();
        //@ts-ignore
        this.scene.sounds.cannon.play();
        this.setRotation(turn);
        this.rotation = turn;
        const turnX = (this.x * Math.atan(turn));
        const turnCood = Math.sqrt(Math.pow(this.width * .5, 2) + Math.pow(this.height * .5, 2));
        const xMove = this.x - this.height * Math.cos(turn);
        const yMove = this.y - this.height * Math.sin(turn);
        const x = Phaser.Math.Clamp(xMove, 0, Phaser.Math.MAX_SAFE_INTEGER);
        const y = Phaser.Math.Clamp(yMove, 0, 600);
        this.anims.showOnStart = true;
        new Anim(
            this.scene,
            x,
            y,
            'smoke',
            'smokeSptite'
        );
        const bullet = new CannonBullet(
            this.scene,
            x,
            y,
            turn,
            this.bulletSpeed,
            'cannon_bullet',
            'bullet');
        this.bullets.add(bullet);
    }

    private calcRotation(): number {
        //@ts-ignore
        const playerPositionX = this.scene.player.x
        //@ts-ignore
        const playerWidth = this.scene.player.width;
        //@ts-ignore
        const playerHeight = this.scene.player.height;
        const playerPos = Math.sqrt(Math.pow(playerHeight, 2) + Math.pow(playerWidth, 2));
        //@ts-ignore
        const correctionPlayer = playerPositionX < this.x ? playerPos * .5 : -(playerPos * .5);
        //@ts-ignore 
        const distance = Phaser.Math.Distance.Between(this.scene.player.x + correctionPlayer, 0, this.x, 0);
        const vector = Math.sqrt(Math.pow(this.bulletSpeed, 2) + Math.pow(this.bulletSpeed, 2));
        //@ts-ignore
        let distanceY = Phaser.Math.Distance.Between(0, this.scene.player.y + correctionPlayer, 0, this.y);
        //@ts-ignore
        if (this.scene.player.y > this.y) {
            //@ts-ignore
            distanceY = 0;
        }
        //@ts-ignore
        const angle = this.scene.physics.world.gravity.y * (distance + distanceY) / Math.pow(vector, 2);
        const arcos = Math.acos(angle)
        return playerPositionX < this.x ? arcos : this.flipAngle(-arcos);
    }

    private createBasis(): void {
        const x = Phaser.Math.Clamp(this.x + this.width * .5, 0, Phaser.Math.MAX_SAFE_INTEGER);
        const y = Phaser.Math.Clamp(this.y + this.height * .5 - 25, 0, 600);
        this.basis = this.scene.add.image(x, y, 'cannon_basis')
            .setDepth(Depth.CannonBasis);
    }

    private flipAngle(angle): number {
        return (angle + Math.PI) % (2 * Math.PI);
    }
}