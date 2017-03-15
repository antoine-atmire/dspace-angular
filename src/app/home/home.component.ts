import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Collection } from "../core/shared/collection.model";
import { Item } from "../core/shared/item.model";
import { CollectionDataService } from "../core/data-services/collection-data.service";
import { ItemDataService } from "../core/data-services/item-data.service";
import { ObjectCacheService } from "../core/cache/object-cache.service";
import { RemoteData } from "../core/data-services/remote-data";

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'ds-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  data: any = {};
  collectionData: RemoteData<Collection[]>;
  itemData: RemoteData<Item[]>;

  constructor(
    private cds: CollectionDataService,
    private ids: ItemDataService,
    private objectCache: ObjectCacheService
  ) {
    this.universalInit();
  }

  universalInit() {

  }

  ngOnInit(): void {
    this.collectionData = this.cds.findAll();
    this.itemData = this.ids.findAll();
  }

}
