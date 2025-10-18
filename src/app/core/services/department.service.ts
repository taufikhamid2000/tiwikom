import { Injectable } from '@angular/core';
import { mockDepartments } from '../../mock-data/mock-departments';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() {}

  getDepartments() {
    return mockDepartments;
  }

  getDepartmentById(id: string) {
    return mockDepartments.find(d => d.departmentId === id);
  }
}
