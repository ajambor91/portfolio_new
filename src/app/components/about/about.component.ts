import { Component, OnInit } from '@angular/core';
import { Colors } from 'src/app/helpers/color.helpers';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  Colors = Colors;
  constructor() { }

  ngOnInit(): void {
  }

}
