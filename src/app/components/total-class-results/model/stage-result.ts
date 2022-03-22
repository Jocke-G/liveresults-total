import {
  Result,
} from "src/app/services/liveresults/models";

export interface StageResult extends Result {
  previousOk: boolean;
  totalOk: boolean;
  totalTime: number;
  totalVirtualTime: number;
  totalPlace: string;
  totalVirtualPlace: string;
  totalPlus: number;
}
