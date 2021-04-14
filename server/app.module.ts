import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { BankModule } from './bank/bank.module';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [UserModule, BankModule, RoleModule, CompanyModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule { }
