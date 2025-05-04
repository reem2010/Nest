import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import Employee from './data/employee';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/employees')
  getEmployees() {
    return this.appService.getEmployees();
  }
  @Get('/employees/highest-paid')
  getHighestPaid() {
    return this.appService.HighestPaidEmployee();
  }

  @Get('/employees/:id')
  getEmployeeById(@Param('id', ParseIntPipe) employeeId: number) {
    return this.appService.getEmployeeById(employeeId);
  }

  @Post('/employees')
  addEmployee(@Body() data: Employee) {
    return this.appService.createEmployee(data);
  }

  @Put('/employees/:id')
  updateEmployee(
    @Param('id', ParseIntPipe) employeeId: number,
    @Body() data: Employee,
  ) {
    return this.appService.updateEmployee(employeeId, data);
  }

  @Delete('/employees/:id')
  deleteStudent(@Param('id', ParseIntPipe) emplyeeId: number) {
    return this.appService.deleteEmployee(emplyeeId);
  }
}
