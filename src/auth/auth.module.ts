import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Module({
    providers: [AuthGuard],
    exports: [AuthGuard]
})
export class AuthModule {}