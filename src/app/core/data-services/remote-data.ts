import { Observable } from "rxjs";
import { hasValue } from "../../shared/empty.util";
import { RequestCacheEntry } from "../cache/request-cache.reducer";

export class RemoteData<T> {

  constructor(
    public state: Observable<RemoteDataState>,
    public errorMessage: Observable<string>,
    public data: Observable<T>
  ) {
  }

  public isNotAsked() : Observable<boolean> {
    return this.state.map(state => state == RemoteDataState.NotAsked);
  }

  public isLoading() : Observable<boolean> {
    return this.state.map(state => state == RemoteDataState.Loading);
  }

  public isFailed() : Observable<boolean> {
    return this.state.map(state => state == RemoteDataState.Failed);
  }

  public isSuccess() : Observable<boolean> {
    return this.state.map(state => state == RemoteDataState.Success);
  }

}

export enum RemoteDataState {
  NotAsked,
    Loading,
    Failed,
    Success
}

export const toRemoteDataState = function (cacheEntry: RequestCacheEntry) {
  if (cacheEntry.isLoading) {
    return RemoteDataState.Loading;
  } else if (hasValue(cacheEntry.errorMessage)) {
    return RemoteDataState.Failed;
  } else {
    return RemoteDataState.Success;
  }
}
