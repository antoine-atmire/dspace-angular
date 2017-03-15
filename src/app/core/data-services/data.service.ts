import { OpaqueToken } from "@angular/core";
import { Observable } from "rxjs";
import { ObjectCacheService } from "../cache/object-cache.service";
import { RequestCacheService } from "../cache/request-cache.service";
import { CacheableObject } from "../cache/object-cache.reducer";
import { ParamHash } from "../shared/param-hash";
import { isNotEmpty } from "../../shared/empty.util";
import { GenericConstructor } from "../shared/generic-constructor";
import { RemoteData, RemoteDataLoading, RemoteDataFailed, RemoteDataSuccess } from "./remote-data";

export abstract class DataService<T extends CacheableObject> {
  abstract serviceName: OpaqueToken;
  protected abstract objectCache: ObjectCacheService;
  protected abstract requestCache: RequestCacheService;

  constructor(private modelType: GenericConstructor<T>) {

  }

  findAll(scopeID?: string): Observable<RemoteData<Array<T>>> {
    const key = new ParamHash(this.serviceName, 'findAll', scopeID).toString();
    return this.requestCache.findAll(key, this.serviceName, scopeID)
      .flatMap(entry => {
        if (entry.isLoading) {
          return Observable.of(new RemoteDataLoading());
        }
        else if (entry.errorMessage) {
          return Observable.of(new RemoteDataFailed(entry.errorMessage));
        }
        else {
          return this.objectCache.getList<T>(entry.resourceUUIDs, this.modelType)
            .map(t => new RemoteDataSuccess(t));
        }
      });
  }

  findById(id: string): Observable<RemoteData<T>> {
    const key = new ParamHash(this.serviceName, 'findById', id).toString();
    return this.requestCache.findById(key, this.serviceName, id)
      .flatMap(entry => {
        if (entry.isLoading) {
          return Observable.of(new RemoteDataLoading());
        }
        else if (entry.errorMessage) {
          return Observable.of(new RemoteDataFailed(entry.errorMessage));
        }
        else if(isNotEmpty(entry.resourceUUIDs)) {
            return this.objectCache.get<T>(entry.resourceUUIDs[0], this.modelType)
              .map(t => new RemoteDataSuccess(t));
        }
        else {
          return Observable.of(new RemoteDataSuccess(undefined));
        }
      })
  }

}
