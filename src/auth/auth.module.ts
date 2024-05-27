import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/jwt.constants";
import { AuthResolver } from "./auth.resolver";

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions:{
        expiresIn:'120s'
      },
    }),
  ],
  controllers: [],
  providers: [AuthService,AuthResolver],
})
export class AuthModule {}