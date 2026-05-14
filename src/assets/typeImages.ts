import { TypeCode } from '../bti/types';

// Image assets for each of the 16 archetypes are added later. To wire one in,
// drop `<CODE>.jpg` (or .png) into `src/assets/types/` and add a mapping:
//
//   import NSGI from './types/NSGI.jpg';
//   export const TYPE_IMAGES: Partial<Record<TypeCode, string>> = { NSGI, ... };
//
// Until then, the map is empty and the result page renders a textual fallback.
export const TYPE_IMAGES: Partial<Record<TypeCode, string>> = {};
