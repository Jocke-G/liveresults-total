export interface Result {
  place: string;
  name: string;
  club: string;
  result: string;
  status: ResultStatus;
  timeplus: string;
  progress: number;
  start: number;
}

export enum ResultStatus {
  OK = 0,
  DID_NOT_START = 1,
  DID_NOT_FINISH = 2,
  MISSED_PUNCH = 3,
  DISQUALIFIED = 4,
  OVER_TIME = 5,
  NOT_STARTED_YET_09 = 9,
  NOT_STARTED_YET_10 = 10,
  WALK_OVER = 11,
  MOVED_UP = 12,
}
