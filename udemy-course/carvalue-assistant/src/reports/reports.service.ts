import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(newReportData: CreateReportDto, currentUser) {
    const newReport = this.repo.create(newReportData);
    newReport.user = currentUser;
    return this.repo.save(newReport);
  }

  async approveReport(reportId: string, approvedData: ApproveReportDto) {
    const report = await this.repo.findOne({
      where: { id: parseInt(reportId) },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approvedData.approved;
    return this.repo.save(report);
  }
}
