import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('/create')
  createReport(@Body() body: CreateReportDto, @CurrentUser() currentUser) {
    console.log('Current user is -->', currentUser);
    return this.reportsService.createReport(body, currentUser);
  }
}
