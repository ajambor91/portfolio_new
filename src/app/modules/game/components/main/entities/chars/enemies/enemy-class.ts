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
    protected particle: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private particleEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
    protected particleShotEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor(scene, xPosition, yPostion, key, type) {
        super(scene, xPosition, yPostion, key, type);
        this.createAnims();
        this.playAnim();
        this.setDepth(Depth.Eniemies)
        //@ts-ignore
        this.body.setImmovable(true);
        this.particle = this.scene.add.particles('blood');
        this.particle.setDepth(Depth.Blood)


    }

    addPlayerBulletCollide(bullet): void {
        if (this.health > 0) {
            //@ts-ignore
            this.scene.physics.add.collider(this, bullet, () => {
                this.particleShotEmitter = this.particle.createEmitter({
                    speed: 50,
                    x: this.x,
                    y: this.y,
                    follow: this, 
                    maxParticles: 1
                });
                //@ts-ignore
                this.health -= this.scene.player.dmg;
                //@ts-ignore
                this.scene.playSound('bulletBodyImpact', this);
                bullet.destroy();
                if (this.health <= 0 && this.dead == false) {
                    this.dead = true;
                    this.isDead();
                }
            });
        }
    }

    protected isDead(): void {
        this.particleEmitter = this.particle.createEmitter({
            speed: 50,
            x: this.x,
            y: this.y,
            follow: this
        });
        this.setDepth(Depth.DeathEnemies);
        //@ts-ignore
        this.body.allowGravity = true;
        if (this.collider != null) this.removeCollision();
        if (this.playerCollider != null) this.removePlayerCollider();
        this.body.velocity.x = -200;
        //@ts-ignore
        this.scene.playSound('beastDeath', this);
        if (this.shooting != null) {
            this.scene.time.removeEvent(this.shooting);
        }
        this.destroySound();
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
            //@ts-ignore
            this.scene.player.particleEmitter.createEmitter(this.scene.player.particleConfig);
            //@ts-ignore
            if(this.scene.player.health % 5 === 0 || this.dmg >= 5) {
                //@ts-ignore
                this.scene.playSound('playerHurt',this, true);
            }
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
                if (this.health <= 0 && this.y > 1120) {
                    this.scene.time.removeEvent(fall);
                    this.particle.removeEmitter(this.particleEmitter);
                    this.particle.removeEmitter(this.particleShotEmitter);
                    this.destroy();
                }
            },
            loop: true
        });
    }

    protected playSound(key: string): void {
        //@ts-ignore
        if (this.soundKey !== 'none') this.scene.playSound(key, this, false, true);
    }


}