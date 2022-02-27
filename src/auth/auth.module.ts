import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [CoreModule],
  providers: [],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
