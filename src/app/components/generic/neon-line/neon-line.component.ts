import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-neon-line',
  templateUrl: './neon-line.component.html',
  styleUrls: ['./neon-line.component.scss']
})
export class NeonLineComponent implements OnInit {
  @Input('color') color: string; 
  @Input('secondColor') secondColor: string;
  @Input('thirdColor') thirdColor: string;

  style: {};
  
  ngOnInit(): void {
    this.fillStyle()
  }

  private fillStyle(): void {
    this.style = {
      'background-color': this.color,
      'box-shadow': `0 0 5px ${this.secondColor}, 0 0 10px ${this.thirdColor}`
    };
  }
}
