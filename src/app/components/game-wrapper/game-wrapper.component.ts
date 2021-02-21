import { AfterViewInit, Compiler, Component, ElementRef, Injector, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { GameSettings } from 'src/app/models/game-settings.model';
import { ImageSize } from 'src/app/models/image-size.model';
import { SoundService } from 'src/app/service/sound.service';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss']
})
export class GameWrapperComponent implements AfterViewInit {

  @ViewChild('game', { read: ViewContainerRef }) game: ViewContainerRef;
  @ViewChild('gameWrapper') gameContainer: ElementRef;

  gameComponent: Type<any>;
  
  isPlaying = false;

  private gameSize: ImageSize;

  constructor(private compiler: Compiler,
    private injector: Injector,
    private soundService: SoundService) { }
 
  ngAfterViewInit(): void {
    this.caclSize();
  }

  startGame(settings: GameSettings): void {
    this.isPlaying = true;
    settings.sound === true && this.soundService.stopAudio();
    this.loadGame(settings);
  }

  private loadGame(settings: GameSettings): void {
    import('../../modules/game/game.module').then(({ GameModule }) => {
      this.compiler.compileModuleAsync(GameModule).then(moduleFactory => {
        const moduleRef = moduleFactory.create(this.injector);
        const componentFactory = moduleRef.instance.resolveComponent();
        const { instance } = this.game.createComponent(componentFactory, null, moduleRef.injector);
        instance.fullScreen = settings.fullScreen;
        instance.sound = settings.sound;
        instance.size = this.gameSize;
        instance.ngOnChanges();
      });
    });
  }

  private caclSize(): void {
    //@ts-ignore
    const ratio = window.screen.width > window.screen.height ?
     window.screen.width / window.screen.height :
     window.screen.height / window.screen.width ;
    const width = window.innerWidth * .8;
    const height = width / ratio;
    this.gameContainer.nativeElement.style.height = `${height}px`;
    this.gameContainer.nativeElement.style.width = `${width}px`;
    this.gameSize = {
      width: width,
      height: height
    };
  }

}
