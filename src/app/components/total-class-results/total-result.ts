import { StageResult } from './stage-result';

export interface TotalResult {
  name: string;
  club: string;
  totalTime: number;
  totalOk: boolean;
  results: Map<string,StageResult>;
}
