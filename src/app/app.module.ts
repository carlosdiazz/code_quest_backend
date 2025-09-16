import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envs } from 'src/config';
import { DatabaseModule } from 'src/database';
import {
  AuthModule,
  CategoryModule,
  CommentModule,
  LikeCommentModule,
  LikePostModule,
  LikeSubCommentModule,
  PostModule,
  SubCommentModule,
} from 'src/components';

const isProduction = envs.STATE === 'PROD';

const apolloPlugin = isProduction
  ? ApolloServerPluginLandingPageProductionDefault
  : ApolloServerPluginLandingPageLocalDefault;

@Module({
  imports: [
    //Modulo Graphql
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [apolloPlugin()],
      context: ({ req }) => ({ req }),
      introspection: isProduction ? false : true,
      persistedQueries: false,
      fieldResolverEnhancers: ['interceptors'],
    }),
    //DB
    DatabaseModule,

    //Components
    AuthModule,
    CategoryModule,
    PostModule,
    LikePostModule,
    LikeCommentModule,
    LikeSubCommentModule,
    CommentModule,
    SubCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
