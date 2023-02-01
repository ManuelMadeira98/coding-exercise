import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';

import { ViewerComponent } from './viewer.component';

describe('ViewerComponent', () => {
	let component: ViewerComponent;
	let fixture: ComponentFixture<ViewerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ViewerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ViewerComponent);
		component = fixture.componentInstance;

		component.addDetailsComponentToView({
			name: 'Product-1',
			productNumber: '1',
			price: 25,
			premium: false,
		});

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render the view if an element exists', () => {
		const element = fixture.debugElement.query(By.css('.display'));
		const productObj: Product = JSON.parse(element.nativeElement.textContent);
		expect(productObj.productNumber).toEqual('1');
	});
});
