import { Component, OnInit } from '@angular/core';
import { icons } from '../data';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  readonly icons = icons;

  constructor() { }

  ngOnInit(): void {
  }

}
