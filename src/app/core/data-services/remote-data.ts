export const RemoteDataStates = {
  NOT_ASKED: 'NotAsked',
  LOADING: 'Loading',
  FAILED: 'Failed',
  SUCCESS: 'Success'
};


export interface RemoteDataState {
  type: string;
}

export class RemoteDataNotAsked implements RemoteDataState{
  type = RemoteDataStates.NOT_ASKED;
  constructor() {}
}

export class RemoteDataLoading implements RemoteDataState {
  type = RemoteDataStates.LOADING;
  constructor() {}
}

export class RemoteDataFailed implements RemoteDataState {
  type = RemoteDataStates.FAILED;
  constructor(public errorMsg: string) {}
}

export class RemoteDataSuccess<T> implements RemoteDataState {
  type = RemoteDataStates.SUCCESS;
  constructor(public data: T) {}
}

export type RemoteData<T> = RemoteDataNotAsked | RemoteDataLoading | RemoteDataFailed | RemoteDataSuccess<T>;
