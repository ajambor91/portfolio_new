import { Compiler, Component, ElementRef, Injector, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-game-wrapper',
  templateUrl: './game-wrapper.component.html',
  styleUrls: ['./game-wrapper.component.scss']
})
export class GameWrapperComponent {

  @ViewChild('game', { read: ViewContainerRef }) game: ViewContainerRef;
  @ViewChild('gameContainer', { read: ElementRef }) gameContainer: ElementRef;

  gameComponent: Type<any>;

  constructor(private compiler: Compiler,
    private injector: Injector) { }
 

  private loadGame(): void {
    import('../../modules/game/game.module').then(({ GameModule }) => {
      this.compiler.compileModuleAsync(GameModule).then(moduleFactory => {
        console.log(GameModule)
        const moduleRef = moduleFactory.create(this.injector);
        console.log(moduleRef)
        const componentFactory = moduleRef.instance.resolveComponent();
        console.log('game', this.game)
        const { instance } = this.game.createComponent(componentFactory, null, moduleRef.injector);
        instance.fullScreen = !true;
        instance.ngOnChanges();

      });
    });
  }

}
