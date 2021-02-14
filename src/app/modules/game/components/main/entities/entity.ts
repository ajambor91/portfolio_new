import { isArray } from "util";

export class Entity extends Phaser.GameObjects.Sprite{
    id: string;
    soundKey: string | string[] = null;
    constructor(scene, xPosition: number, yPostion: number, key: string, type: string) {
        super(scene, xPosition, yPostion, key);
        this.scene = scene;
        this.scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
        this.id = type;
        this.isObjectCreated();
    }   

    private isObjectCreated(): void {
        
        const waitingForObject = this.scene.time.addEvent({
            delay: 1,
            callback: () => {
                if(this.soundKey === 'none'){
                    this.scene.time.removeEvent(waitingForObject)
                }else  if(this.soundKey != null){
                    this.addSound();
                    this.scene.time.removeEvent(waitingForObject)
                }
            },
            loop: true
        });
    }

    private addSound(): void {
        console.log('soundkEt',this.soundKey)
        //@ts-ignore
        if(typeof this.soundKey === 'undefined') return;
        //@ts-ignore
        if(Array.isArray(this.soundKey)){
            //@ts-ignore
            this.soundKey.forEach(item => {
                console.log('foreach', item)
                this.addMarker(item);
            });
        }else{
            this.addMarker(this.soundKey);
        }

    }

    private addMarker(item): void {
        console.log('&&&&&&&&&', this, item, this.soundKey)
        //@ts-ignore
        console.log(this.scene.sounds)
        //@ts-ignore
        this.scene.sounds[item].addMarker({
            name: this.id,
            start: 0
          });
    }

}