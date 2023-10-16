import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { GetEstimationDto } from './dto/get-estimation.dto';

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

  getEstimation(estimationDto: GetEstimationDto) {
    console.log(estimationDto);
    return this.repo
      .createQueryBuilder()
      .select('ABS(price)', 'price')
      .where('brand = :brand', { brand: estimationDto.brand })
      .andWhere('model = :model', { model: estimationDto.model })
      .andWhere('longitude - :longitude BETWEEN -5 AND 5', {
        longitude: estimationDto.longitude,
      })
      .andWhere('latitude - :latitude BETWEEN -5 AND 5', {
        latitude: estimationDto.latitude,
      })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: estimationDto.year })
      .andWhere('approved is TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: estimationDto.mileage })
      .limit(3)
      .getRawOne();
  }
}
