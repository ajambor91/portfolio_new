import { Type } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { GameModule } from './modules/game/game.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'portfoliofront';
  gameComponent: Type<any>;
  ngOnInit(): void {
    this.loadGame();
  }

  private loadGame(): void {
    import('./modules/game/game.module')
    .then(res => res.GameModule)
    .then(gameModule => {
      this.gameComponent = gameModule.gameComponent;
    });
  }
}
