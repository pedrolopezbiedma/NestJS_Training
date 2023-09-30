import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthService (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST handleSignup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: 'pedrotest2@test.com', password: '12345' })
      .expect(201)
      .then((response) => {
        // console.log('response is -->', response)
        // Expect would go here.
      });
  });
});
