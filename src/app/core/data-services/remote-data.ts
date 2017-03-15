import { Observable } from "rxjs";

export class RemoteData<T> {
  constructor(
    public notAsked: Observable<boolean>,
    public isLoading: Observable<boolean>,
    public errorMessage: Observable<string>,
    public data: Observable<T>
  ) {}
}
