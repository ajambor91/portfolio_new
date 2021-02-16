import { Depth } from "../../../../enums/depth.enum";
import { EnemyClass } from "../enemy-class";

export class Spikes extends EnemyClass {

    protected dmg = .25;
    soundKey = 'slash';
    private firstCollide = false;
    constructor(scene, xPosition: number, yPostion: number, key: string, type: string) {

        super(scene, xPosition, yPostion, key, type);
        this.setDepth(Depth.Traps)
        //@ts-ignore
        this.body.allowGravity = false;
        //@ts-ignore
        this.body.allowGravity = true;
        this.addWorldCollision();
        this.addPlayerCollision();

    }

    addPlayerBulletCollide(bullet): void { }

    protected addPlayerCollision(): void {
        //@ts-ignore
        this.playerCollider = this.scene.physics.add.collider(this, this.scene.player, () => {
            if (this.firstCollide === false) {
                //@ts-ignore
                this.scene.playSound('slash', this);
                this.runChecker();
            }
            //@ts-ignore
            this.scene.player.health -= this.dmg;
            //@ts-ignore
            this.scene.player.particleEmitter.createEmitter(this.scene.player.particleConfig);
            //@ts-ignore
            if (this.scene.player.health % 5 === 0 || this.dmg >= 5) {
                //@ts-ignore
                this.scene.playSound('playerHurt', this, true);
            }
        });
    }

    private runChecker(): void {
        const checker = this.scene.time.addEvent({
            delay: 5,
            callback: () => {
                this.firstCollide = this.checkOverlap();
                this.firstCollide || this.scene.time.removeEvent(checker);
            },
            loop: true
        });
    }

    private checkOverlap(): boolean {
        //@ts-ignore
        if ((this.scene.player.x  >= this.x && this.scene.player.x  <= this.x + this.width) &&
            //@ts-ignore
            (this.scene.player.y  >= this.y - this.height && this.scene.player.y <= this.y)) {
                return true;
        }else{
            return false
        }
    }
}
