import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ItemTypeModule } from './item-type/item-type.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ItemTypeModule, ItemModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
