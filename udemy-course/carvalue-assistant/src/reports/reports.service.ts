import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createReport(newReportData: CreateReportDto, currentUser) {
    const newReport = this.repo.create(newReportData);
    newReport.user = currentUser;
    return this.repo.save(newReport);
  }
}
