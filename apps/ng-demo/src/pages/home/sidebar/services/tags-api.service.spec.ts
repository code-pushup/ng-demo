import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TagsApiService } from './tags-api.service';
import { BASE_API } from '../../../../constants/api.constant';

describe('TagsApiService', () => {
  let service: TagsApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TagsApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a get request to appropriate url on getTags subscription', () => {
    service.getTags().subscribe();
    const req = httpMock.expectOne(`${BASE_API}/tags`);
    expect(req.request.method).toBe('GET');
  });
});
