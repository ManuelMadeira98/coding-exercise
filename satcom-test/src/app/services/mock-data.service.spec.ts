import { TestBed } from '@angular/core/testing';

import { MockDataService } from './mock-data.service';

describe('MockDataService', () => {
	let service: MockDataService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MockDataService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return observable data of size 30', (done) => {
		service.getData().subscribe((data) => {
			expect(data.length).toEqual(30);
			done();
		});
	});
});
