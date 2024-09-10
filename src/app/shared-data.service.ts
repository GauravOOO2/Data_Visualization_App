// src/app/shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // BehaviorSubject to store and share data across components
  private dataSubject = new BehaviorSubject<{ datetime: string, temperature: number }[]>([]);
  data$ = this.dataSubject.asObservable();

  // Method to update data
  addData(entry: { datetime: string, temperature: number }) {
    const currentData = this.dataSubject.value;
    this.dataSubject.next([...currentData, entry]);
  }
}