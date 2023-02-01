import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
	map,
	Observable,
	Subscription,
} from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { Product } from 'src/app/models/product';
import { MockDataService } from 'src/app/services/mock-data.service';
import { ReflexionUtils } from 'src/app/utils/reflexion.utils';
import { ViewerComponent } from '../viewer/viewer.component';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy {
	// @Input() viewerComponent: ViewerComponent;

	filterForm: FormControl;
	subscriptions = new Subscription();

	private mockData$: Observable<(Product | Customer)[]>;
	filteredData$: Observable<(Product | Customer)[]>;

	constructor(private mockDataService: MockDataService) {}

	ngOnInit(): void {
		this.initForm();
		this.mockData$ = this.mockDataService.getData();
		this.onFilterChange('');
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	initForm(): void {
		this.filterForm = new FormControl();
		this.subscriptions.add(
			this.filterForm.valueChanges.subscribe((filterValue) => {
				this.onFilterChange(filterValue);
			})
		);
	}

	onFilterChange(inputSearched: string) {
		if (!inputSearched) {
			this.filteredData$ = this.mockData$;
		} else {
			this.filteredData$ = this.mockData$.pipe(
				map((data) => {
					return data.filter((item) => 
						!ReflexionUtils.isProductPremium(item) &&
						(this.hasNameMatch(item, inputSearched) || this.hasPriceMatch(item, inputSearched) || this.hasRegexMatch(item, inputSearched))
					);
				})
			);
		}
	}

	selectElement(element: Product | Customer) {
		this.mockDataService.updateSelectedElement(element);
		// this.viewerComponent.addDetailsComponentToView(element);
	}

	private hasNameMatch(item: Product | Customer, inputSearched: string) {
		return item.name.toLocaleLowerCase().includes(inputSearched.toLocaleLowerCase());
	}

	private hasPriceMatch(item: Product | Customer, inputSearched: string) {
		return ReflexionUtils.isProduct(item) && item.price.toString().startsWith(inputSearched);
	}

	private hasRegexMatch(item: Product | Customer, inputSearched: string) {
		const regex = new RegExp(inputSearched);

		// Test regex against 'name' and 'price' for Product types
		if (ReflexionUtils.isProduct(item)) {
			return regex.test(item.name) || regex.test(item.price.toString());
		}

		// Test regex against 'name' only for Customer types
		return regex.test(item.name);
	}
}
