import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { AdditionalTextComponent } from './components/canvas/components/header/additional-text/additional-text.component';
import { AboutComponent } from './components/about/about.component';
import { NeonLineComponent } from './components/generic/neon-line/neon-line.component';
import { GameWrapperComponent } from './components/game-wrapper/game-wrapper.component';
import { AskWindowComponent } from './components/game-wrapper/components/ask-window/ask-window.component';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './components/generic/checkbox/checkbox.component';
import { OptionMenuComponent } from './components/option-menu/option-menu.component';
import { EqualizerComponent } from './components/option-menu/components/equalizer/equalizer.component';
import { FlagComponent } from './components/option-menu/components/flag/flag.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SheetComponent } from './components/sheet/sheet.component';
import { ComponentCommunicationService } from './components/canvas/service/component-communication.service';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoaderComponent,
    ButtonComponent,
    LinkComponent,
    CanvasComponent,
    HeaderComponent,
    AdditionalTextComponent,
    AboutComponent,
    NeonLineComponent,
    GameWrapperComponent,
    AskWindowComponent,
    CheckboxComponent,
    OptionMenuComponent,
    EqualizerComponent,
    FlagComponent,
    SheetComponent,
    MobileNavComponent    
  ],
  imports: [
    BrowserModule,
    GameModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [
    PreloadService,
    { provide: APP_INITIALIZER, useFactory: (preLoad: PreloadService) => () => preLoad.launch(), deps: [PreloadService], multi: true },
    ComponentCommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

