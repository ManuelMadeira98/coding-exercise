import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable, of, Subject } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
	providedIn: 'root',
})
export class MockDataService {
	private mockDataNumber = 30;

	private selectedElement = new Subject<Product | Customer>();
	selectedElement$ = this.selectedElement.asObservable();

	constructor() {}

	updateSelectedElement(element: Product | Customer) {
		this.selectedElement.next(element);
	}

	getData(): Observable<(Product | Customer)[]> {
		const data = [];

		for (let i = 0; i < this.mockDataNumber; i++) {
			data.push(
				Math.random() > 0.5
					? this.createRandomProduct(i)
					: this.createRandomCustomer(i)
			);
		}

		return of(data);
	}

	createRandomProduct(index: number): Product {
		return {
			name: `Product-${index}`,
			productNumber: `${index}`,
			price: Math.random() * 30,
			premium: Math.random() > 0.5,
		};
	}

	private createRandomCustomer(index: number): Customer {
		return {
			name: `Customer-${index}`,
			birthDate: new Date(Math.floor(Math.random() * Date.now())),
		};
	}
}
