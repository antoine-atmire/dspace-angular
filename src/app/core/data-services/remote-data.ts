import { Observable } from "rxjs";
import { hasValue } from "../../shared/empty.util";

export class RemoteData<T> {
  failed: Observable<boolean>;
  success: Observable<boolean>;

  constructor(
    public loading: Observable<boolean>,
    public errorMessage: Observable<string>,
    public data: Observable<T>
  ) {
    this.failed = Observable.combineLatest(
      this.loading,
      this.errorMessage.map(msg => hasValue(msg)),
      (loading, hasMsg) => !loading && hasMsg
    ).distinctUntilChanged();

    this.success = Observable.combineLatest(
      this.loading,
      this.failed,
      (loading, failed) => !(loading || failed)
    ).distinctUntilChanged();
  }


}
