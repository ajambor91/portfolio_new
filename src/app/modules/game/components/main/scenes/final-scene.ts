import { TranslateService } from "@ngx-translate/core";
import { CustomInjector } from "../di/custom.injector";
import { ResultService } from "../services/result.service";
import { Scene } from "./scene";
import { map, retry, catchError } from 'rxjs/operators';

export class FinalScene extends Scene {
    private reward: Phaser.GameObjects.BitmapText;
    
    private playerName: string;
    private textName: Phaser.GameObjects.BitmapText;
    private resultService: ResultService;
    private points: number
    private type: Phaser.GameObjects.BitmapText;

    constructor(private translateService: TranslateService){
        super({key: 'final'});
        this.resultService = CustomInjector.resolve(ResultService);
    }
    init(data){
        this.points = data.points;
    }
    create(){
        this.reward = this.add.bitmapText(420, 200, 'font', 'Gratulacje! Wygrana!');
        this.add.bitmapText(200, 400,'font', 'Wpisz swoje imie');
        this.input.keyboard.on('keyup', (e) => this.typeName(e));
        this.textName = this.add.bitmapText(720, 400,'font', '');
        this.playerName = '';
        this.add.line(0,0,860,450,1150,450,0xffffff);

        this.type = this.add.bitmapText(420, 700, 'font','Wpisz swoje imię')
    }

    typeName(e: KeyboardEvent): void {
        const keys = [
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','w','z','x','y',
            'ą','ć','ę','ś','ń','ó','ł','ż','ź'
        ];
        if(e.key === 'Backspace'){          
            this.playerName = this.playerName.slice(0, -1);
            if(this.playerName === ''){
                this.type.text = 'Wpisz swoje imię';
            }
        }else if(keys.includes(e.key.toLowerCase())){
            this.playerName += e.key;
            this.type.text = "Klknij enter, żeby zatwierdzić";
        }else if (e.key === 'Enter'){
            if(this.playerName != ''){
                this.resultService.addResult({name: this.playerName, points: this.points}).subscribe(res => {
                    this.scene.start('result', {points: this.points});
                });
            }

        }
        this.textName.text = this.playerName;
    }
    
}