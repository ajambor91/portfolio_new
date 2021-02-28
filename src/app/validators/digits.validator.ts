import { AbstractControl } from "@angular/forms";

export class CustomValidator {
  static phone(control: AbstractControl): {[key: string]: any} {
    if (!(/^\d{9}$/.test(control.value)) && control.value != null && control.value != '') {
      return {
        phone: true
      }
    }
    return null;
  }

  static text(control: AbstractControl): {[key: string]: any} {
    if (!(/^[a-zA-Z.,-_; ?!]{3,}$/.test(control.value))) {
      return {
        text: true
      }
    }
    return null;
  }
}