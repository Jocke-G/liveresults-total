import { ResultStatus } from "src/app/services/liveresults/models/result";

export interface StageResult {
  status: ResultStatus;
  time: number;
  place: number;
  timePlus: number;

  totalOk: boolean;
  totalTime: number;
  totalPlus: number;
}
