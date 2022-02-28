import { ResultStatus } from "../../services/liveresults/models/result";

export interface StageResult {
  time: number;
  status: ResultStatus;
  totalTime: number;
  totalOk: boolean;
}
