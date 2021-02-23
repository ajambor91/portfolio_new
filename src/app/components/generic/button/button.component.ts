import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Colors } from 'src/app/helpers/color.helpers';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  animations: [
    trigger('flipButton',
      [
        state('default', style({
          transform: 'rotateX( 180deg )'
        })),
        state('flipped', style({
          transform: 'rotateX( 0deg )'
        })),
        transition('default => flipped', [
          animate('.5s')
        ]),
        transition('flipped => default', [
          animate('.5s')
        ])
      ])
  ]
})
export class ButtonComponent implements OnInit {

  @Input() link: string;
  @Input() description: string;

  @Input() initialFrontColor: string;
  @Input() initialBackColor: string;
  @Input() topFrontColor: string;;
  @Input() topBackColor: string;
  @Input() type: string;

  buttonStyle;
  buttonBackStyle;
  isOpen = false;
  
  constructor() { }

  ngOnInit(): void {
    this.fitColors();
  }
  toggle(): void{
    this.isOpen = !this.isOpen;
  }
  private fitColors(): void {

    this.buttonStyle = {
      'background': `linear-gradient(to bottom, ${this.topFrontColor} 5%,  ${this.initialFrontColor} 100%)`,
    };

    this.buttonBackStyle = {
      'background': `linear-gradient(to bottom, ${this.topBackColor} 5%,  ${this.initialBackColor} 100%)`,
    };
  }

}


