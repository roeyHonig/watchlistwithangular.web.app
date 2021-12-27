import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { MediaItemService } from './media-item.service';

@Component({
  selector: 'mw-media-item-form',
  templateUrl: './media-item-form.component.html',
  styleUrls: ['./media-item-form.component.css']
})
export class MediaItemFormComponent {

  lookupLists = {
    mediums: ['Movies', 'Series']
  };
  
  form: FormGroup = this.formBuilder.group({
    medium: this.formBuilder.control('Movies'),
    name: this.formBuilder.control('', Validators.compose([
      Validators.required,
      Validators.pattern('[\\w\\-\\s\\/]+')
    ])),
    category: this.formBuilder.control(''),
    year: this.formBuilder.control('', this.yearValidator),
  });

  constructor(
    private formBuilder: FormBuilder,
    private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      medium: this.formBuilder.control('Movies'),
      name: this.formBuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      category: this.formBuilder.control(''),
      year: this.formBuilder.control('', this.yearValidator),
    });
  }

  yearValidator(control: { value: string; }) {
    if (control.value.trim().length === 0) {
      return null;
    }
    let year = parseInt(control.value);
    let minYear = 1800;
    let maxYear = 2500;
    if (year >= minYear && year <= maxYear) {
      return null;
    } else {
      return {
        'year': {
          min: minYear,
          max: maxYear
        }
      };
    }
  }

  onSubmit(mediaItem: any) {
    this.mediaItemService.search(mediaItem)?.subscribe(mediaItems => {
      this.mediaItemService.onMediaChange(mediaItems);
    });;
  }
}
