import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Item, SubItems } from '../../shared/item';
import { ItemSubCategoriesService } from '../../services/item-sub-categories.service';
import { ItemCategoriesService } from '../../services/item-categories.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  categories = ['rhitik', 'prasun', 'jaisal'];
  itemForm: FormGroup;
  item: Item;
  filteredCategories: Observable<any[]>;
  subFormCopy: FormGroup[];
  numberOfVariants = 1
  subForm = [this.fb.group({
    itemSubName: ['', [Validators.required]],
    itemQuantity: ['', [Validators.required]],
    itemPicture: ['', [Validators.required]],
    itemBarcode: ['', [Validators.required]],
    itemMRP: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    itemWholesaleRate: ['', [Validators.required]],
    itemContents: ['', [Validators.required]],
  })]




  formErrors = {
    'itemName': '',
    'itemDetail': '',
    'itemCategory': '',
    'itemParentCompany': '',
    'numberOfVariants': ''
  };
  validationMessages = {
    'itemName': {
      'required': 'Item name is required.',
    },
    'itemCategory': {
      'required': 'Item Category is required.',
    },
    'itemParentCompany': {
      'required': 'Item Parent Company is required.'
    },
    'numberOfVariants': {
      'required': 'Number of variants is required.'
    },
  };


  constructor(private fb: FormBuilder,
    private itemCategoriesService: ItemCategoriesService, ) {
    this.createForm();
    this.filteredCategories = this.itemForm.get('itemCategory').valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.categories.slice());
    this.itemForm.get('numberOfVariants').valueChanges.subscribe(number => { this.numberOfVariants = +number; this.valueChangedNumberofVariants() });
    this.subForm[0].valueChanges.subscribe(function anon(index, changedValue) {
      if (this.subFormCopy === undefined) {
        this.subFormCopy = [changedValue];
      } else {
        this.subFormCopy[index] = changedValue;
      }
    }.bind(this, this.subForm.length - 1))
  }


  ngOnInit() {
  }


  createForm() {
    this.itemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      itemDetail: ['', [Validators.required]],
      itemCategory: ['', [Validators.required]],
      itemParentCompany: ['', [Validators.required]],
      numberOfVariants: [1, [Validators.required, Validators.pattern('[0-9]*')]],
    });
    this.itemForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }



  /** This function changes the dom when the number of variants is changed in the parent form.*/
  valueChangedNumberofVariants() {
    this.subForm = this.subForm.slice(0, this.numberOfVariants);
    if (this.subForm.length < this.numberOfVariants) {
      for (let i = 0; i < this.numberOfVariants; i++) {
        this.subForm.push(this.fb.group({
          itemSubName: ['', [Validators.required]],
          itemQuantity: ['', [Validators.required]],
          itemPicture: ['', [Validators.required]],
          itemBarcode: ['', [Validators.required]],
          itemMRP: ['', [Validators.required, Validators.pattern('[0-9]*')]],
          itemWholesaleRate: ['', [Validators.required]],
          itemContents: ['', [Validators.required]],
        }));
        //   this.subForm[this.subForm.length - 1].valueChanges.subscribe(function anon(index, changedValue) {
        //     this.subFormCopy.push(changedValue);
        //     console.log(changedValue, index)
        //   }.bind(this, this.subForm.length - 1))
        // }
      }
    }
  }
  onValueChanged(data?: any) {
    if (!this.itemForm) { return; }
    const form = this.itemForm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.item = this.itemForm.value;
    // this.ordersCopy.post(this.orderForm.value).subscribe(orders => this.orders = this.orders);
    // Make a post request or put request to the server.

    this.itemForm.reset({
      itemName: '',
      itemDetail: '',
      itemCategory: '',
      itemParentCompany: '',
      numberOfVariants: 1,
    });
  }

  filterStates(name: string) {
    return this.categories.filter(category =>
      category.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}