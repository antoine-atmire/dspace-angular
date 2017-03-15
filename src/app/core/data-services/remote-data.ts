export type RemoteData<T>
  = RemoteDataNotAsked
  | RemoteDataLoading
  | RemoteDataFailed
  | RemoteDataSuccess<T>;


export class RemoteDataState {

  public isNotAsked() {
    return false;
  }

  public isLoading() {
    return false;
  }

  public isFailed() {
    return false;
  }

  public isSuccess() {
    return false;
  }

}


export class RemoteDataNotAsked extends RemoteDataState{
  public isNotAsked() {
    return true
  }
}

export class RemoteDataLoading extends RemoteDataState {
  public isLoading() {
    return true;
  }
}

export class RemoteDataFailed extends RemoteDataState {
  constructor(public errorMessage:string){ super(); }
  public isFailed() {
    return true;
  }
}

export class RemoteDataSuccess<T> extends RemoteDataState {
  constructor(public data: T) { super(); }
  public isSuccess() {
    return true;
  }
}

