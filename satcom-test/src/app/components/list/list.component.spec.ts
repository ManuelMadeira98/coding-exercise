import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReflexionUtils } from 'src/app/utils/reflexion.utils';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
	let component: ListComponent;
	let fixture: ComponentFixture<ListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render 30 elements in the list', () => {
		const listElements = fixture.debugElement.queryAll(By.css('.list-element'));
		expect(listElements.length).toEqual(30);
	});

	it('should display the products filtered by name', (done) => {
		component.onFilterChange('product');
		component.filteredData$.subscribe(items => {
			let filterIsValid = true;

			for (const item of items) {
				if (!item.name.includes('Product')) {
					filterIsValid = false;
					break;
				}
			}

			expect(filterIsValid).toBe(true);
			done();
		})
	});

	it('should display the customers filtered by name', (done) => {
		component.onFilterChange('customer');
		component.filteredData$.subscribe(items => {
			let filterIsValid = true;

			for (const item of items) {
				if (!item.name.includes('Customer')) {
					filterIsValid = false;
					break;
				}
			}

			expect(filterIsValid).toBe(true);
			done();
		})
	});

	it('should leave premium products unfiltered', (done) => {
		component.onFilterChange('product');
		component.filteredData$.subscribe(items => {
			let filterIsValid = true;

			for (const item of items) {
				if (ReflexionUtils.isProductPremium(item)) {
					filterIsValid = false;
					break;
				}
			}

			expect(filterIsValid).toBe(true);
			done();
		})
	});

	it('should display elements filtered by regex', (done) => {
		component.onFilterChange('^[A-C]');
		component.filteredData$.subscribe(items => {
			let filterIsValid = true;

			for (const item of items) {
				if (!ReflexionUtils.isCustomer(item)) {
					filterIsValid = false;
					break;
				}
			}

			expect(filterIsValid).toBe(true);
			done();
		})
	});
});
