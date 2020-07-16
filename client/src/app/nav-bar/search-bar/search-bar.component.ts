import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  constructor(
    private _filtersService: FiltersService
  ) { }

  public searchTerm = new FormControl('', [Validators.required,
    Validators.minLength(1)]);

  public search(): void {
    if (this.searchTerm.invalid) {
      return;
    }

    const term = this.searchTerm.value;
    this._filtersService.updateSearchTerm(term);
  }

}
