import { Depth } from "../../../../enums/depth.enum";
import { DemonBullet } from "../../../objects/demon_bullet";
import { EnemyClass } from "../enemy-class";

export class Demon extends EnemyClass {

    soundKey = ['bulletBodyImpact', 'beastDeath', 'demonBullet'];

    protected readonly dmg = 10;
    protected shooting: Phaser.Time.TimerEvent;
    protected health = 50;
    protected speed = 0;

    private readonly fireRate = 1500;
    private bullets: Phaser.GameObjects.Group;

    constructor(scene, xPosition: number, yPostion: number, key: string, type: string, shootDelay: number) {
        super(scene, xPosition, yPostion, key, type);

        this.setDepth(Depth.Eniemies)
        //@ts-ignore
        this.body.allowGravity = false;
        this.createGroup();
        //@ts-ignore
        this.body.allowGravity = false;
        this.scene.time.delayedCall(shootDelay, () => this.startShooting());
        this.setX(this.x + 50)
        //@ts-ignore
        this.body.setSize(50, 180).setOffset(70, 0);
    }



    protected playAnim(): void {
        this.anims.play('fly',);
    }

    protected createAnims(): void {
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('demon', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: -1,
        });
    }

    private startShooting(): void {
        this.shooting = this.scene.time.addEvent({
            delay: this.fireRate,
            callback: () => this.shot(),
            loop: true
        });
    }

    private createGroup(): void {
        this.bullets = this.scene.add.group();
    }

    private shot(): void {
        //@ts-ignore
        this.scene.playSound('demonBullet', this);
        const x = Phaser.Math.Clamp(this.x, 0, Phaser.Math.MAX_SAFE_INTEGER);
        const y = Phaser.Math.Clamp(this.y, 0, 600);
        for (let i = 0; i < 6; i++) {
            const bullet = new DemonBullet(
                this.scene,
                x,
                y,
                'bullet',
                'demonBullet',
                i + 1
            );
            this.bullets.add(bullet);
            this.addDmg(bullet);
        }
    }

    private addDmg(bullet): void {
        //@ts-ignore
        this.scene.physics.add.collider(bullet, this.scene.player, () => {
            if (typeof this.scene !== 'undefined') {
                //@ts-ignore
                this.scene.player.health -= this.dmg;
                //@ts-ignore
                this.scene.playSound('playerHurt', this, true);
                //@ts-ignore
                this.scene.player.particleEmitter.createEmitter(this.scene.player.particleConfig);
                bullet.destroy();

            }
        });
    }


}
