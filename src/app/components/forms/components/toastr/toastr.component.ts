import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Colors } from 'src/app/helpers/color.helpers';
import { msg } from './data/msg';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
    trigger('toastr', [
      state('in', style({ opacity : 1, transform: 'translateY(0)'})),
      transition(':enter' ,[
        style({ opacity : .1, transform: 'translateY(50%)'}),
        animate(300)
      ])
    ])
  ]
})
export class ToastrComponent implements OnInit {

  @Input() isSuccess: boolean;
  
  style;
  msg: string;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.setMsg();
  }

  private setMsg(): void {
    this.style = {
      'background-color': this.isSuccess === true ? Colors.$greenTop : Colors.$orange
    }
    this.msg = this.isSuccess === true ? msg.success : msg.fail;
  }

}
