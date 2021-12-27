import { Component } from '@angular/core';

import { MediaItemService } from './media-item.service';
import { MediaItem } from './media-item.service';

@Component({
  selector: 'mw-media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.css']
})
export class MediaItemListComponent {
  medium = '';
  mediaItems: MediaItem[] = [];

  constructor(private mediaItemService: MediaItemService) {}

  ngOnInit() {
    this.mediaItemService.getMediaChangeEmitter().subscribe(mediaItems => {
      this.mediaItems = mediaItems;
    });
  }

}
