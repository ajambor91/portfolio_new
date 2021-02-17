import { Compiler, ElementRef, Injector, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GameModule } from './modules/game/game.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfoliofront';
  gameComponent: Type<any>;
  @ViewChild('game', { read: ViewContainerRef }) game: ViewContainerRef;
  @ViewChild('gameContainer', {read: ElementRef}) gameContainer: ElementRef;

  constructor(private compiler: Compiler,
    private injector: Injector) { }


  ngOnInit(): void {
    this.loadGame();
  }

  fullScreen(): void {
 
    
  }
  private loadGame(): void {
    import('./modules/game/game.module').then(({GameModule}) => {
        this.compiler.compileModuleAsync(GameModule).then(moduleFactory => {
          console.log( GameModule)
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
