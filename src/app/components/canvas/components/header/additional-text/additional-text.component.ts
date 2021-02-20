import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-additional-text',
  templateUrl: './additional-text.component.html',
  styleUrls: ['./additional-text.component.scss'],
  animations: [
    trigger('text', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'scale(2)' }),
        animate(200)
      ])
    ])
  ]
})

export class AdditionalTextComponent implements OnInit {

  @Input('text') text: string;

  constructor() { }

  ngOnInit(): void {
  }



}
