import {
  Result,
} from 'src/app/services/liveresults/models';

export interface TotalResult {
  name: string;
  club: string;
  total: number,
  results: Map<string,Result>;
}
