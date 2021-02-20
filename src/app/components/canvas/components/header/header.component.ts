import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AdditionalTextComponent } from './additional-text/additional-text.component';
import { texts } from './data/header-texts';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('header') header: ElementRef;
  @ViewChild('additionalText', {read: ViewContainerRef}) additionalText: ViewContainerRef;

  private readonly startSpeed = 10000;
  private readonly addTextSpeed = 700;
  private readonly addTextsKeys = ['headerSecond', 'headerThird', 'headerFourth','headerFifth'];

  private textComponenets: ComponentRef<AdditionalTextComponent>[] = [];
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.addMainText().then(res=> {
      console.log('dupa')
      this.addTexts();
    });
  }

  
  private addTexts(): void {
    let i = 0;
    this.addAdditionalText(i);
    i++;
    (function addTextInterval(i, context){
      setTimeout(() => {
        context.addAdditionalText(i);
        i++;
        if(i < context.addTextsKeys.length){
          addTextInterval(i, context);
        }
      }, context.addTextSpeed)
    })(i, this)
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
          }else{
            resolve(true);
          }
        }, context.calcSpeed());
      })(i, this);
    })
  }

  private addAdditionalText(i): void {
    import('./additional-text/additional-text.component').then(({AdditionalTextComponent}) => {
      const factory = this.componentFactoryResolver.resolveComponentFactory(AdditionalTextComponent);
      const textComponent = this.additionalText.createComponent<AdditionalTextComponent>(factory);
      textComponent.instance.text = texts[this.addTextsKeys[i]];
      this.textComponenets.length > 0 && this.textComponenets[i-1].destroy();
      this.textComponenets.push(textComponent);
    })

  }

  private calcSpeed(): number {
    return Math.sqrt(this.startSpeed);
  }
}
