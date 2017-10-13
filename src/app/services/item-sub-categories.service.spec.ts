import { TestBed, inject } from '@angular/core/testing';

import { ItemSubCategoriesService } from './item-sub-categories.service';

describe('ItemSubCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemSubCategoriesService]
    });
  });

  it('should be created', inject([ItemSubCategoriesService], (service: ItemSubCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
