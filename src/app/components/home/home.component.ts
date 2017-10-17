import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Item, SubItems } from '../../shared/item';
import { ItemSubCategoriesService } from '../../services/item-sub-categories.service';
import { ItemCategoriesService } from '../../services/item-categories.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';
import { sTu, uTs } from './helper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  itemForm: FormGroup;
  item: Item;
  filteredCategories: Observable<any[]>;
  categories;
  obj;
  valueCategory;
  selectedCategory;
  chosenCategories;
  objCopy;
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
    private http: Http, ) {
    this.initItemForm();
    itemCategoriesService.getCategoriesObject().subscribe(obj => {
      this.obj = obj;
      this.objCopy = obj;
      const categoriesCopy = Object.keys(obj);
      this.categories = []
      // Make seperate function
      categoriesCopy.forEach(element => {
        this.categories.push(element.replace(/_/g, ' '));
      });
      this.filteredCategories = this.itemForm.get('itemCategory').valueChanges
        .startWith(null)
        .map(state => {
          if (typeof (state) === 'string') {
            return state ? this.filterStates(state) : this.categories.slice()
          }
        });
    });
    this.chosenCategories = []
  }


  ngOnInit() {
  }


  initItemForm() {
    this.itemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      itemDetail: [''],
      itemCategory: [''],
      itemParentCompany: ['', [Validators.required]],
      subItems: this.fb.array([
        this.initSubItem()
      ])
    });
    this.itemForm.controls.subItems.valueChanges.subscribe(() => { this.onValueChangedVariant(+this.itemForm.get('subItems.length') - 1) })
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
      itemWholesaleRate: ['', [Validators.pattern('[0-9]*')]],
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

  addCategory() {
    this.chosenCategories.push(this.selectedCategory);
    if (!(sTu(this.selectedCategory) in this.obj)){
      this.obj[sTu(this.selectedCategory)] = {}
    }
    this.obj = this.obj[sTu(this.selectedCategory)];
    const categoriesCopy = Object.keys(this.obj) || [''];
    this.categories = []
    // Make seperate function
    categoriesCopy.forEach(element => {
      this.categories.push(element.replace(/_/g, ' '));
    });
    this.selectedCategory = '';
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
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessagesVariants[field];
        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrorsSubItems[index][field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.itemForm.get('itemCategory').setValue(this.chosenCategories);
    this.chosenCategories = []
    this.item = this.itemForm.value;
    this.http.post('http://localhost:3000/products', this.item).subscribe(woot => console.log(woot), err => console.log(err));
    this.http.post('http://localhost:3001/categories', this.objCopy).subscribe(woot => console.log(woot), err => console.log(err));
    this.itemForm.reset({
      itemName: '',
      itemDetail: '',
      itemCategory: '',
      itemParentCompany: '',
      subItems: this.initSubItem()
    });
    this.itemCategoriesService.getCategoriesObject().subscribe(obj => {
      this.obj = obj;
      this.objCopy = this.objCopy;
      const categoriesCopy = Object.keys(obj);
      this.categories = []
      categoriesCopy.forEach(element => {
        this.categories.push(element.replace(/_/g, ' '));
      });
    })
  };

  filterStates(name: string) {
    return this.categories.filter(category =>
      category.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}