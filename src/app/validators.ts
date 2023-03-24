import { AbstractControl, ValidationErrors } from "@angular/forms";

export class MyValidators {
    static password(control: AbstractControl) : ValidationErrors | null {
        let password: string = control.value as string;
        if(password.trim().length == 0) return {"password": true, message: "Password is required"};
        if(password.length < 8) return {"password": true, message: "Password should contain atleast 8 character"};
        if(!/[A-Z]/.test(password)) return {"password": true, message: "Password should contain atleast one upper case letter"};
        if(!/[0-9]/.test(password)) return {"password": true, message: "Password should contain atleast one number"};
        return null;
    }
    static email(control: AbstractControl) : ValidationErrors | null {
        let email: string = control.value as string;
        if(email.trim().length == 0) return {"email": true, message: "Email is required"};
        if(!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) return {"email": true, message: "Invalid Email Address"};
        return null;
    }
    static address(control: AbstractControl) : ValidationErrors | null {
        let address: string = control.value as string;
        if(address.trim().length == 0) return {"address": true, message: "Address is required"};
        return null;
    }

    static name_(control: AbstractControl) : ValidationErrors | null {
        let name: string = control.value as string;
        if(name.trim().length == 0) return {"name": true, message: "Name is required"};
        return null;
    }
}
