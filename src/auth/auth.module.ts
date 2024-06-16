import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/jwt.constants";
import { AuthResolver } from "./auth.resolver";
import { ServicioService } from 'src/servicio/servicio.service';
import { ServicioResolver } from "src/servicio/servicio.resolver";

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions:{
        expiresIn:'800s'
      },
    }),
  ],
  controllers: [],
  providers: [AuthService,AuthResolver],
})
export class AuthModule {}