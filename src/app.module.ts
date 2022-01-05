import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { User } from './users/user.model';

@Module({
  imports: [
    ProductsModule,

    // can use: useFactory and databaseProviders
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567',
      database: 'manageuser',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '30m'}
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
