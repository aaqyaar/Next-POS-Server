import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      // check if the user of the company exist
      const user = await this.prismaService.user.findUnique({
        where: { id: createCompanyDto.userId },
      });

      if (!user) {
        throw new NotFoundException(
          'User you want to create a company for does not exist',
        );
      }
      // check if the company exist
      const company = await this.prismaService.company.findUnique({
        where: {
          email: createCompanyDto.email,
          phone: createCompanyDto.phone,
        },
      });

      if (company) {
        throw new BadRequestException('Company already exist');
      }

      // create the company

      return await this.prismaService.company.create({
        data: { ...createCompanyDto },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prismaService.company.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(fields: Prisma.CompanyWhereUniqueInput) {
    const company = await this.prismaService.company.findUnique({
      where: { ...fields },
    });
    console.log(company);
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} company`;
  // }
}
