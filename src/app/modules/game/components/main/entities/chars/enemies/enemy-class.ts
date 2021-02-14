import { Depth } from "../../../enums/depth.enum";
import { Entity } from "../../entity";

export abstract class EnemyClass extends Entity {
    protected playerCollider: Phaser.Physics.Arcade.Collider = null;
    protected health = 100;
    protected shooting: Phaser.Time.TimerEvent = null;
    protected speed: number;

    private readonly falling = 100;
    private dead = false;
    private collider: Phaser.Physics.Arcade.Collider = null;
    private woodCollider: Phaser.Physics.Arcade.Collider = null;
    private monsterCollider: Phaser.Physics.Arcade.Collider = null;
    private soundKey = 'snake';

    constructor(scene, xPosition, yPostion, key, type, soundKey?) {
        super(scene, xPosition, yPostion, key, type);
        this.createAnims();
        this.playAnim();
        this.setDepth(Depth.Eniemies)
        //@ts-ignore
        this.body.setImmovable(true);
        

        console.log('soundKey', this.soundKey)
        this.playSound();
    }

    addPlayerBulletCollide(bullet): void {
        if (this.health > 0) {
            //@ts-ignore
            this.scene.physics.add.collider(this, bullet, () => {
                //@ts-ignore
                this.health -= this.scene.player.dmg;
                bullet.destroy();
                if (this.health <= 0 && this.dead == false){
                    this.dead = true;
                    this.isDead();
                } 
            });
        }
    }

    protected isDead(): void {
        this.setDepth(Depth.DeathEnemies);
        //@ts-ignore
        this.body.allowGravity = true;
        if (this.collider != null) this.removeCollision();
        if (this.playerCollider != null) this.removePlayerCollider();
        this.body.velocity.x = -200;

        if (this.shooting != null) {
            this.scene.time.removeEvent(this.shooting);
        }
        this.destroyDeadEnemy();
    }

    protected move(): void {
        this.body.velocity.x = this.speed;
    }

    protected createAnims() { }

    protected playAnim() { };

    protected addPlayerCollision(): void {
        //@ts-ignore
        this.playerCollider = this.scene.physics.add.collider(this, this.scene.player, () => {
            //@ts-ignore
            this.scene.player.health -= this.dmg;
        });
    }

    protected addWorldCollision(): void {
        //@ts-ignore
        this.collider = this.scene.physics.add.collider(this.scene.layers.groundLayer, this, () => {
            this.addTurnAfterCollison();
        });

        //@ts-ignore
        this.woodCollider = this.scene.physics.add.collider(this.scene.layers.woodCollisionLayer, this, () => {
            this.addTurnAfterCollison();
        });
        //@ts-ignore
        this.monsterCollider = this.scene.physics.add.collider(this.scene.layers.monsterCollideLayer, this, () => {
            this.addTurnAfterCollison();
        });
    }

    private addTurnAfterCollison(): void {
        //@ts-ignore
        if (this.body.blocked.right) {
            this.flipX = true
            //@ts-ignore
            this.body.velocity.x = -this.speed;
            //@ts-ignore
        } else if (this.body.blocked.left) {
            this.flipX = false;
            //@ts-ignore
            this.body.velocity.x = this.speed;
        }
    }

    private removeCollision(): void {
        this.scene.physics.world.removeCollider(this.collider);
        this.scene.physics.world.removeCollider(this.monsterCollider);
        this.scene.physics.world.removeCollider(this.woodCollider);
    }

    private removePlayerCollider(): void {
        this.scene.physics.world.removeCollider(this.playerCollider);
    }

    private destroyDeadEnemy(): void {
        const fall = this.scene.time.addEvent({
            delay: this.falling,
            callback: () => {
                if (this.health <= 0 && this.y > 600) {
                    this.scene.time.removeEvent(fall);
                    this.destroy();
                }
            },
            loop: true
        });
    }

    private playSound(): void{
        //@ts-ignore
        // this.scene.playSound(this.soundKey, this, true);
    }
}