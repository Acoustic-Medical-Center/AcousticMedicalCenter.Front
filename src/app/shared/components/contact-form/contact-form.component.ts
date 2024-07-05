import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
 contactForm: FormGroup;

 constructor(private fb:FormBuilder, private toastr:ToastrService){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
     console.log(this.contactForm.valid);
    } else {
     console.log('Contact error');
    }
  }

  sendMessage(){
    this.toastr.success('Mail Gönderildi');
  }
}
