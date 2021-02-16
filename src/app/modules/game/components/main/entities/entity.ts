import { isArray } from "util";
import { TypeHelper } from "../helpers/type-helper";

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
        let adding = false;
        const waitingForObject = this.scene.time.addEvent({
            delay: 50,
            callback: () => {
                if(!TypeHelper.isNotUndefined(this.soundKey) && adding === false){
                    adding = true;
                    this.scene.time.removeEvent(waitingForObject)
                }else  if(this.soundKey != null && adding === false){
                    adding = true;
                    this.addSound();
                    this.scene.time.removeEvent(waitingForObject)
                }
            },
            loop: true
        });
    }

    private addSound(): void {
        //@ts-ignore
        if(typeof this.soundKey === 'undefined') return;
        //@ts-ignore
        if(Array.isArray(this.soundKey)){
            //@ts-ignore
            this.soundKey.forEach(item => {
                this.addMarker(item);
            });
        }else{
            this.addMarker(this.soundKey);
        }

    }

    private addMarker(item): void {
        //@ts-ignore
        if(!TypeHelper.isNotUndefined(this.scene.charsSounds[item])) this.scene.charsSounds[item] = {};
        //@ts-ignore
        //@ts-ignore
        this.scene.charsSounds[item][this.id] = this.scene.sound.add(item);
        //@ts-ignore
        //@ts-ignore
    }

    protected destroySound(soundKey: string): void | null{
        //@ts-ignore
        if(!TypeHelper.isNotUndefined(this.scene.charsSounds[soundKey][this.id])) return;
        //@ts-ignore
        this.scene.charsSounds[soundKey][this.id].destroy();
        let i = 0;
        //@ts-ignore
        const soundSourceLength = this.scene.soundSources.length - 1;
    
        for(i; i < soundSourceLength; i++) {
            //@ts-ignore
            if (this.scene.soundSources[i].entity === this){
                //@ts-ignore
                this.scene.soundSources.splice(i,1);
            }
        }
    }

}