import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationSeedService } from './application-seed.service';

describe('ApplicationSeedService', () => {
  let service: ApplicationSeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationSeedService],
    }).compile();

    service = module.get<ApplicationSeedService>(ApplicationSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
