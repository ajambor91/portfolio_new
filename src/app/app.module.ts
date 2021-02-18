import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameModule } from './modules/game/game.module';
import { HeaderComponent } from './components/header/header.component';
import { PreloadService } from './service/preload.service';
import { LoaderComponent } from './components/generic/loader/loader.component';
import { ButtonComponent } from './components/generic/button/button.component';
import { LinkComponent } from './components/generic/link/link.component';
import { Colors } from './helpers/color.helpers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoaderComponent,
    ButtonComponent,
    LinkComponent
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
