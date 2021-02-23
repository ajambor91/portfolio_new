import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Colors } from 'src/app/helpers/color.helpers';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {

  Colors = Colors;

  name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  phone: FormControl = new FormControl('', [Validators.required]);
  message: FormControl = new FormControl('', [Validators.minLength(10)]);
  form: FormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    phone: this.phone,
    message: this.message
  });
  submitted = false;

  constructor(private mailService: EmailService) { }

  submit(): void {
    let errors = false;

    if(this.form.invalid){
      errors = this.checkErrors();
    }

    if(this.submitted === true || errors === true) {
      return;
    }

    this.submitted = true;
    this.mailService.sendEmail(this.form.value).subscribe((response: boolean) => {
      console.log('res', response);
    });
  }

  private checkErrors(): boolean {
    let errors = false;;
    for (let [key, value] of Object.entries(this.form.controls)) {
      if(value.invalid === true) {
        value.markAsTouched();
        errors = false;
      }else{
        errors = true;
      }
    }
    return errors;
  }
}
