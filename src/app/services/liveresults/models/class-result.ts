import {
  Result,
} from '../models';

export interface ClassResult {
  status: string;
  className: string;
  splitcontrols: any[];
  results: Result[];
  hash: string;
}
