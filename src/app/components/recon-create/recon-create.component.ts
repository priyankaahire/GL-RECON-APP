import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recon-create',
  templateUrl: './recon-create.component.html',
  styleUrls: ['./recon-create.component.scss']
})
export class ReconCreateComponent {
 form: FormGroup;
 frequencies = [
  { id: 'dauly', value: 'Daily' },
    { id: 'monthly', value: 'Monthly' },
    { id: 'weekly', value: 'Weekly' },
 ]
 constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    reconName: ['', Validators.required],
    frequency: ['', Validators.required],
  });
 }
 get reconName() {
  return this.form.get('reconName');
}

get frequency() {
  return this.form.get('frequency');
}
 onSubmit() {
  if (this.form.valid) {
    console.log(this.form.value);
  }
 }
}
