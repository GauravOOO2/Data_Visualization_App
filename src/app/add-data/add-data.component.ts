import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {
  dataForm: FormGroup;
  dataEntries: { datetime: string, temperature: number }[] = [];

  constructor(private fb: FormBuilder, private dataService: SharedDataService) {
    this.dataForm = this.fb.group({
      datetime: ['', [Validators.required]],
      temperature: ['', [Validators.required, Validators.min(-50), Validators.max(50)]]
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const formValue = this.dataForm.value;
      const entry = {
        datetime: formValue.datetime,
        temperature: formValue.temperature
      };
      this.dataEntries.push(entry);
      this.dataService.addData(entry);
      this.dataForm.reset();
    }
  }
}