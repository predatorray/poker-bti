export type Axis = 'NM' | 'SC' | 'GV' | 'IT';

export type Pole = 'N' | 'M' | 'S' | 'C' | 'G' | 'V' | 'I' | 'T';

export type TypeCode =
  | 'NSGI' | 'NSGT' | 'NSVI' | 'NSVT'
  | 'NCGI' | 'NCGT' | 'NCVI' | 'NCVT'
  | 'MSGI' | 'MSGT' | 'MSVI' | 'MSVT'
  | 'MCGI' | 'MCGT' | 'MCVI' | 'MCVT';

export const ALL_TYPE_CODES: TypeCode[] = [
  'NSGI', 'NSGT', 'NSVI', 'NSVT',
  'NCGI', 'NCGT', 'NCVI', 'NCVT',
  'MSGI', 'MSGT', 'MSVI', 'MSVT',
  'MCGI', 'MCGT', 'MCVI', 'MCVT',
];

export const AXES: Axis[] = ['NM', 'SC', 'GV', 'IT'];

export const AXIS_POLES: Record<Axis, [Pole, Pole]> = {
  NM: ['N', 'M'],
  SC: ['S', 'C'],
  GV: ['G', 'V'],
  IT: ['I', 'T'],
};

export interface Question {
  id: string;
  axis: Axis;
  options: [
    { pole: Pole },
    { pole: Pole }
  ];
}
