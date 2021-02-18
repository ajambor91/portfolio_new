import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameModule } from './modules/game/game.module';
import { HeaderComponent } from './components/header/header.component';
import { PreloadService } from './service/preload.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    GameModule,
    HttpClientModule
  ],
  providers: [
    PreloadService,
    {provide: APP_INITIALIZER, useFactory: (preLoad: PreloadService) => () => preLoad.launch(), deps: [PreloadService] ,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
