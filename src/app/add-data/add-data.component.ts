// src/app/add-data/add-data.component.ts

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
  dataEntries: { datetime: string, temperature: number }[] = [];  // Define this array

  constructor(private fb: FormBuilder, private dataService: SharedDataService) {
    this.dataForm = this.fb.group({
      datetime: ['', [Validators.required, this.validateDateTime]],
      temperature: ['', [Validators.required, Validators.min(-50), Validators.max(50)]]
    });
  }

  validateDateTime(control: any): { [key: string]: boolean } | null {
    const currentDate = new Date().getTime();
    const inputDate = new Date(control.value).getTime();
    return inputDate < currentDate ? null : { futureDate: true };
  }

  onSubmit() {
    if (this.dataForm.valid) {
      this.dataEntries.push(this.dataForm.value);  // Push the data into the array
      this.dataService.addData(this.dataForm.value);  // Update shared data service
      this.dataForm.reset();
    }
  }
}
