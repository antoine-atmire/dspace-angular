import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { HeaderState } from "./header.reducer";
import { Observable } from "rxjs";
import { HeaderToggleAction } from "./header.actions";

@Component({
  selector: 'ds-header',
  styleUrls: ['header.component.css'],
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private store: Store<HeaderState>
  ) {
  }

  ngOnInit(): void {
  }

  public isNavBarCollapsed(): Observable<boolean> {
    return this.store.select('header')
    .map(({ navCollapsed }: HeaderState) => navCollapsed);
  }

  public toggle(): void {
    this.store.dispatch(new HeaderToggleAction());
  }

}
