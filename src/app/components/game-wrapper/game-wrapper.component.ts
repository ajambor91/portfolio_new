import { AfterViewInit, Compiler, Component, ElementRef, Injector, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { GenericHelper } from 'src/app/helpers/generic.helper';
import { GameSettings } from 'src/app/models/game-settings.model';
import { ImageSize } from 'src/app/models/image-size.model';
import { SoundService } from 'src/app/service/sound.service';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss']
})
export class GameWrapperComponent implements OnInit, AfterViewInit {

  @ViewChild('game', { read: ViewContainerRef }) game: ViewContainerRef;
  @ViewChild('gameWrapper') gameContainer: ElementRef;

  gameComponent: Type<any>;

  isPlaying = false;
  gameMobile: boolean;

  private gameSize: ImageSize;
  private calcSizeInterval;

  constructor(private compiler: Compiler,
    private injector: Injector,
    private soundService: SoundService) { }
    
  ngOnInit(): void {
    this.checkIsMobile();
  }

  ngAfterViewInit(): void {
    this.caclSize();
    this.calcSizeInInterval();
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
      window.screen.height / window.screen.width;
    const width = window.innerWidth * .8;
    const height = width / ratio;
    this.gameContainer.nativeElement.style.height = `${height}px`;
    this.gameContainer.nativeElement.style.width = `${width}px`;
    this.gameSize = {
      width: width,
      height: height
    };
  }

  private checkIsMobile(): void {
    this.gameMobile = GenericHelper.checkIsMobile();
  }

  private calcSizeInInterval(): void {
    this.calcSizeInterval = setInterval(()=>{
      this.caclSize();
    },50);
  }

}
