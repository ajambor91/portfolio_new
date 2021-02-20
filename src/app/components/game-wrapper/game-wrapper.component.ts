import { Compiler, Component, ElementRef, Injector, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { GameSettings } from 'src/app/models/game-settings.model';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss']
})
export class GameWrapperComponent {

  @ViewChild('game', { read: ViewContainerRef }) game: ViewContainerRef;

  gameComponent: Type<any>;

  isPlaying = false;

  constructor(private compiler: Compiler,
    private injector: Injector) { }
 
  startGame(settings: GameSettings): void {
    this.isPlaying = true;
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
        instance.ngOnChanges();
      });
    });
  }

}
