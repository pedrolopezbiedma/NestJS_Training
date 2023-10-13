import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize-password.interceptor';
import { ReportDto } from './dto/report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Serialize(ReportDto)
  @Post('/create')
  createReport(@Body() body: CreateReportDto, @CurrentUser() currentUser) {
    return this.reportsService.createReport(body, currentUser);
  }

  @Patch('/approve/:id')
  approveReport(@Param('id') reportId: string, @Body() body: ApproveReportDto) {
    return this.reportsService.approveReport(reportId, body);
  }
}
