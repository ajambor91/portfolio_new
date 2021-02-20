import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input('label') label: string;
  @Input('checkColor') checkColor: string;
  @Input('backgroundColor') backgroundColor: string;
  @Input('model') model;
  @ViewChild('svg') svg: ElementRef;
  @ViewChild('input') input: ElementRef;
  @ViewChild('checkBg') checkBg: ElementRef;

  svgStyle: {};

  ngOnInit(): void {
    this.prepare()
  }

  check(): void {
    this.model = !this.model;
  }

  private prepare(): void {
    this.svgStyle = {
      'fill': this.checkColor
    }
  }

}
