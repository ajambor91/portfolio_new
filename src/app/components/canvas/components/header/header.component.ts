import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentCommunicationService } from '../../service/component-communication.service';
import { AdditionalTextComponent } from './additional-text/additional-text.component';
import { texts } from './data/header-texts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('header') header: ElementRef;
  @ViewChild('additionalText', { read: ViewContainerRef }) additionalText: ViewContainerRef;

  private readonly startSpeed = 200;
  private readonly addTextSpeed = 700;
  private readonly addTextsKeys = ['headerSecond', 'headerThird', 'headerFourth', 'headerFifth'];

  private textComponenets: ComponentRef<AdditionalTextComponent>[] = [];
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private communicationServie: ComponentCommunicationService) { }

  ngAfterViewInit(): void {
    const appStart$ = this.communicationServie.appStart.subscribe((res: boolean) => {
      if (res === true) {
        this.addMainText().then(() => {
          this.addTexts();
        });
        appStart$.unsubscribe();
      }
    });
  }

  private addTexts(): void {
    let i = 0;
    this.addAdditionalText(i);
    i++;
    (function addTextInterval(i, context) {
      context.addAdditionalText(i);
      i++;
      setTimeout(() => {
        if (i < context.addTextsKeys.length) {
          addTextInterval(i, context);
        }
      }, context.addTextSpeed)
    })(i, this);
  }

  private addMainText(): Promise<boolean> {
    return new Promise(resolve => {
      let i = 0;
      (function addMainTextInterval(i, context) {
        setTimeout(() => {
          context.header.nativeElement.textContent += texts.headerFirst[i];
          i++
          if (i < texts.headerFirst.length) {
            addMainTextInterval(i, context);
          } else {
            resolve(true);
          }
        }, context.startSpeed);
      })(i, this);
    });
  }

  private addAdditionalText(i): void {
    import('./additional-text/additional-text.component').then(({ AdditionalTextComponent }) => {
      const factory = this.componentFactoryResolver.resolveComponentFactory(AdditionalTextComponent);
      const textComponent = this.additionalText.createComponent<AdditionalTextComponent>(factory);
      textComponent.instance.text = texts[this.addTextsKeys[i]];
      this.textComponenets.length > 0 && this.textComponenets[i - 1].destroy();
      this.textComponenets.push(textComponent);
    });
  }
}
