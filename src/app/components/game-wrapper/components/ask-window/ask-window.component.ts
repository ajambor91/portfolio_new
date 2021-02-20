import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Colors } from 'src/app/helpers/color.helpers';

@Component({
  selector: 'app-ask-window',
  templateUrl: './ask-window.component.html',
  styleUrls: ['./ask-window.component.scss']
})
export class AskWindowComponent implements OnInit {

  Colors = Colors;

  sound = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
