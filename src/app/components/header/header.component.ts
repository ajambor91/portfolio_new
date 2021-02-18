import { Component, OnInit } from '@angular/core';
import { Colors } from 'src/app/helpers/color.helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  Colors = Colors;
  constructor() { }

  ngOnInit(): void {
  }

}
