import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Project } from "src/project/entity/project.entity";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "src/shared/strategy/jwt.strategy";


@Module({
    imports:[
        TypeOrmModule.forFeature([Project]),
        JwtModule.register({}),
    ],
    providers:[ProjectService,JwtService,JwtStrategy],
    controllers:[ProjectController,]
})
export class ProjectModule{}