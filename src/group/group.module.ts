import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core.module';
import { GroupController } from './group.controller';

@Module({
  imports: [CoreModule],
  controllers: [GroupController],
  providers: [],
})
export class GroupModule {}
