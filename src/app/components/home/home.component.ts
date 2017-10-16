import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Item, SubItems } from '../../shared/item';
import { ItemSubCategoriesService } from '../../services/item-sub-categories.service';
import { ItemCategoriesService } from '../../services/item-categories.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  categories = ['rhitik', 'prasun', 'jaisal'];
  itemForm: FormGroup;
  item: Item;
  filteredCategories: Observable<any[]>;
  formErrorsItem = {
    'itemName': '',
    'itemDetail': '',
    'itemCategory': '',
    'itemParentCompany': '',
  };

  formErrorsSubItems = [{
    'itemQuantity': '',
    'itemBarcode': '',
    'itemMRP': '',
    'itemWholesaleRate': ''
  }]

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

  };

  validationMessagesVariants = {

    'itemQuantity': {
      'required': 'Item Quantity is required.',
    },
    'itemBarcode': {
      'required': 'Barcode is required.'
    },
    'itemMRP': {
      'required': 'MRP is required.',
      'pattern': 'MRP must be a number'
    },
    'itemWholesaleRate': {
      'pattern': 'Wholesale rate must be a number'
    }
  };

  constructor(private fb: FormBuilder,
    private itemCategoriesService: ItemCategoriesService, 
    private http: Http,) {
    this.initItemForm();
    this.filteredCategories = this.itemForm.get('itemCategory').valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.categories.slice());

  }


  ngOnInit() {
  }


  initItemForm() {
    this.itemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      itemDetail: [''],
      itemCategory: ['', [Validators.required]],
      itemParentCompany: ['', [Validators.required]],
      subItems: this.fb.array([
        this.initSubItem()
      ])
    });
    this.itemForm.controls.subItems.valueChanges.subscribe(() => { this.onValueChangedVariant(+this.itemForm.get('subItems.length') - 1)})
    this.itemForm.valueChanges
      .subscribe(data => this.onValueChangedItemForm(data));
    this.onValueChangedItemForm(); // (re)set validation messages now
  }


  initSubItem() {
    const subItem = this.fb.group({
      itemSubName: [''],
      itemQuantity: ['', [Validators.required]],
      itemPicture: [''],
      itemBarcode: ['', [Validators.required]],
      itemMRP: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      itemWholesaleRate: ['', [ Validators.pattern('[0-9]*')]],
      itemContents: [''],
    });
    return subItem;
  }

  addSubItem() {
    const control = <FormArray>this.itemForm.controls['subItems'];
    control.push(this.initSubItem());
    this.formErrorsSubItems.push({
      'itemQuantity': '',
      'itemBarcode': '',
      'itemMRP': '',
      'itemWholesaleRate': ''
    });
  }

  removeSubItem() {
    // remove address from the list
    const control = <FormArray>this.itemForm.controls['subItems'];
    control.removeAt(control.length - 1);
  }

  onValueChangedItemForm(data?: any) {
    if (!this.itemForm) { return; }
    const form = this.itemForm;
    // tslint:disable-next-line:forin
    for (const field in this.formErrorsItem) {
      // clear previous error message (if any)
      this.formErrorsItem[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrorsItem[field] += messages[key] + ' ';
        }
      }
    }
  }

  onValueChangedVariant(index: number) {
    if (!this.itemForm.controls.subItems.get(String(index))) { return; }
    const form = this.itemForm.controls.subItems.get(String(index));
    // tslint:disable-next-line:forin
    for (const field in this.formErrorsSubItems[index]) {
      // clear previous error message (if any)
      this.formErrorsSubItems[index][field] = '';
      console.log(this.formErrorsSubItems[index])
      const control = form.get(field);
      // console.log(control)
      // console.log(control.valid)
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessagesVariants[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          console.log(messages)
          this.formErrorsSubItems[index][field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.item = this.itemForm.value;
    // this.ordersCopy.post(this.orderForm.value).subscribe(orders => this.orders = this.orders);
    // Make a post request or put request to the server.
    this.http.post('http://localhost:3000/products', this.item).subscribe(woot => console.log(woot), err => console.log(err));

    this.itemForm.reset({
      itemName: '',
      itemDetail: '',
      itemCategory: '',
      itemParentCompany: '',
      subItems: this.initSubItem()
    });
  }



  filterStates(name: string) {
    return this.categories.filter(category =>
      category.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}