import {
  StageResult,
} from '../model';

export interface TotalResult {
  name: string;
  club: string;
  totalTime: number;
  totalOk: boolean;
  results: Map<string,StageResult>;
}
