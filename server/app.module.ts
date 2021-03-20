import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { BankModule } from './bank/bank.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, BankModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
