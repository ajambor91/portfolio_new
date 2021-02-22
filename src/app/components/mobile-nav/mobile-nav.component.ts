import { Component, OnInit } from '@angular/core';
import { Colors } from 'src/app/helpers/color.helpers';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {
  Colors = Colors;
  constructor() { }

  ngOnInit(): void {
  }

}
