import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameModule } from './modules/game/game.module';
import { NavComponent } from './components/nav/nav.component';
import { PreloadService } from './service/preload.service';
import { LoaderComponent } from './components/generic/loader/loader.component';
import { ButtonComponent } from './components/generic/button/button.component';
import { LinkComponent } from './components/generic/link/link.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasComponent } from './components/canvas/canvas.component';
import { HeaderComponent } from './components/canvas/components/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoaderComponent,
    ButtonComponent,
    LinkComponent,
    CanvasComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    GameModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    PreloadService,
    {provide: APP_INITIALIZER, useFactory: (preLoad: PreloadService) => () => preLoad.launch(), deps: [PreloadService] ,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
