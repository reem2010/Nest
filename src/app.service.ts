import { Injectable, NotFoundException } from '@nestjs/common';
import Employee from './data/employee';

@Injectable()
export class AppService {
  private employees: Employee[] = [
    { id: 1, name: 'Debra May', age: '64', salary: 84121.31 },
    { id: 2, name: 'Joshua Reynolds', age: '45', salary: 40393.11 },
    { id: 3, name: 'Melissa Smith', age: '48', salary: 66390.67 },
    { id: 4, name: 'Jennifer Curry', age: '50', salary: 75066.3 },
    { id: 5, name: 'Michael Mitchell', age: '37', salary: 34760.75 },
    { id: 6, name: 'Christopher White', age: '33', salary: 74030.97 },
    { id: 7, name: 'Emily Humphrey', age: '41', salary: 35241.03 },
    { id: 8, name: 'Jim Lane', age: '41', salary: 37117.53 },
    { id: 9, name: 'Eddie Mcguire', age: '32', salary: 89476.83 },
    { id: 10, name: 'Victoria Carlson', age: '60', salary: 55999.58 },
  ];
  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: Number) {
    return this.employees.find((e) => e.id === id);
  }
  HighestPaidEmployee() {
    return this.employees.reduce(
      (prev, curr) => (curr.salary > prev.salary ? curr : prev),
      this.employees[0],
    );
  }

  createEmployee(data: Employee) {
    const idx = this.employees.push({ ...data, id: this.employees.length + 1 });
    return this.employees[idx];
  }

  updateEmployee(id: Number, data: Employee) {
    const idx = this.employees.findIndex((e) => e.id === id);
    if (idx < 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    } else {
      this.employees[idx] = { ...this.employees[idx], ...data };
    }
    return this.employees[idx];
  }

  deleteEmployee(id: Number) {
    const idx = this.employees.findIndex((e) => e.id === id);
    if (idx < 0) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    } else {
      this.employees.splice(idx, 1);
    }
    return { message: 'Deleted successfully' };
  }
}
