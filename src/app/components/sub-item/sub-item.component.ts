import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-item',
  templateUrl: './sub-item.component.html',
  styleUrls: ['./sub-item.component.scss']
})
export class SubItemComponent implements OnInit {
  @Input('group')
  public subItems: FormGroup;

  @Input('index')
  public i: number;

  @Input('errors')
  public subItemErrors: any;

  constructor() { }

  ngOnInit() {
  }

}
