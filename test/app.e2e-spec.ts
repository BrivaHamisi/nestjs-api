import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";

describe('App e2e', () => {

  beforeAll(async () => {
    // Setup code before all tests run
    const moduleRef = await Test.createTestingModule({
      // module imports and providers
      imports: [AppModule],
    }).compile();
  });

  it.todo('Should Pass'); 
});