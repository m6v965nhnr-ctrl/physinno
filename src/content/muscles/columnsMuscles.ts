import type { AnatomyColumn } from "./columnTypes.ts";
import { COL_HEAD } from "./columnsHead.ts";
import { COL_TRUNK } from "./columnsTrunk.ts";
import { COL_UPPER } from "./columnsUpper.ts";
import { COL_LOWER } from "./columnsLower.ts";

export const MUSCLE_COLUMNS: Record<string, AnatomyColumn> = { ...COL_HEAD, ...COL_TRUNK, ...COL_UPPER, ...COL_LOWER };
