import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Colors } from 'src/app/helpers/color.helpers';
import { EmailService } from 'src/app/service/email.service';
import { CustomValidator } from '../../validators/digits.validator';
import { ToastrComponent } from './components/toastr/toastr.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {

  @ViewChild('toastr', {read: ViewContainerRef}) toastr: ViewContainerRef; 

  Colors = Colors;

  name: FormControl = new FormControl('', [CustomValidator.text]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  phone: FormControl = new FormControl('', [CustomValidator.phone]);
  message: FormControl = new FormControl('', [CustomValidator.text]);
  form: FormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    phone: this.phone,
    message: this.message
  });
  submitted = false;

  private readonly timeToDestroy = 2000;
  private toastrInstance: ComponentRef<ToastrComponent>; 

  constructor(private mailService: EmailService, private factoryResolver: ComponentFactoryResolver) { }

  submit(): void {
    let errors = false;

    if(this.form.invalid){
      errors = this.checkErrors();
    }

    if(this.submitted === true || this.form.invalid === true) {
      return;
    }

    this.submitted = true;
    this.mailService.sendEmail(this.form.value).subscribe((response: boolean) => {
      this.createToastr(true);
    },
    error => {
      this.createToastr(false);
    });
  }

  private checkErrors(): boolean {
    let errors = false;;
    for (let [key, value] of Object.entries(this.form.controls)) {
      if(value.invalid === true) {
        value.markAsTouched();
        errors = true;
      }else{
        errors = false;
      }
    }
    return errors;
  }

  private createToastr(isSuccess: boolean): void {
    const toastr = this.factoryResolver.resolveComponentFactory(ToastrComponent);
    this.toastrInstance = this.toastr.createComponent<ToastrComponent>(toastr);
    this.toastrInstance.instance.isSuccess = isSuccess;
    setTimeout(() => {
      this.destroyToastr();
    }, this.timeToDestroy);
  }

  private destroyToastr(): void {
    this.toastrInstance.destroy();
  }
}
