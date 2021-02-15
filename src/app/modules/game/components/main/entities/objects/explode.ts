import { BulletClass } from "./bullet-class";

export class Explode extends BulletClass {

    private collider: Phaser.Physics.Arcade.Collider;
    private playerHurts = false;

    constructor(scene, xPosition: number, yPostion: number, key: string, type: string) {
        super(scene, xPosition, yPostion, key, type);
        //@ts-ignore
        this.body.setImmovable(true);
        this.addPlayerHurts();
        this.createAnims();
        this.playAnims();
    }

    private createAnims(): void {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('bullet_explode', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
    }

    private playAnims(): void {
        //@ts-ignore
        this.scene.playSound('bombExplode', this);
        //@ts-ignore
        this.anims.play('explode', true).on('animationcomplete', () => {
            this.scene.physics.world.removeCollider(this.collider);
            let i = 0;
            //@ts-ignore
            const arrLength = this.scene.soundSources.length - 1;
            for (i; i < arrLength; i++){
                //@ts-ignore
                if(this.scene.soundSources[i].entity === this) {
                    //@ts-ignore
                    this.scene.soundSources.splice(i, 1);
                    break;
                }
            }
            this.destroy();
        });
    }

    private addPlayerHurts(): void {
        //@ts-ignore
        this.collider = this.scene.physics.add.collider(this, this.scene.player, () => {
            if (this.playerHurts === false) {
                //@ts-ignore
                this.scene.player.health -= 30;
                this.playerHurts = true;
            }
        });
    }
}