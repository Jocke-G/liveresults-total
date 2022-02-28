import {
  Result,
} from '../models';

export interface ClassResults {
  status: string;
  className: string;
  splitcontrols: any[];
  results: Result[];
  hash: string;
}
