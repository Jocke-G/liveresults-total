import {
  ClassInfo,
} from "../models";

export interface ClassCollection {
    status: string;
    classes: ClassInfo[];
    hash: string;
}
