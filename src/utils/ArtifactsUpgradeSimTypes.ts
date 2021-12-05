export type ArtifactsFormat = {
  symbol: string;
  level: number;
  rarity: number;
  set: string;
  part: string;
  mainEntry: string;
  mainEntryValue: number | string;
  entry: any[];
  initEntry: string;
  upgradeHistory: any[];
  lock: boolean;
  isNew: boolean;
  equipped: number | string;
};

export type CharacterSetFormat = {
  name: string;
  Plume: string;
  Flower: string;
  Sands: string;
  Circlet: string;
  Goblet: string;
};

// ArtifactsData
export type ArtifactsDataType = {
  [key: string]: any;
  entryList: string[];
  entryProbability: number[];
  entryValue: EntryValueType;
  extraEnrtyRate: number;
  parts: string[];
  Plume: string[];
  Flower: string[];
  Sands: string[];
  Circlet: string[];
  Goblet: string[];
  mainEntryList: string[];
  hourglassRate: number[];
  hatRate: number[];
  cupRate: number[];
  mainEntryValueList: MainEntryValueListType;
  scoreList: string[];
  scoreStandar: ScoreStandarType;
  setList: string[];
  artifactSet: {
    [key: string]: ArtifactSetType;
  };
  setBonus: SetBonusType;
  exp: number[];
  character: CharacterType[];
  weaponType: string[];
  elementType: string[];
  nation: string[];
  otherStats: string[];
};

export type EntryValueType = {
  [key: string]: number[];
  CRITRate: number[];
  CRITDMG: number[];
  ATK: number[];
  ATKPer: number[];
  DEF: number[];
  DEFPer: number[];
  HP: number[];
  HPPer: number[];
  energyRecharge: number[];
  elementMastery: number[];
};

export type MainEntryValueListType = {
  [key: string]: number[];
};

export type ScoreStandarType = {
  [key: string]: number;
};

export type ArtifactSetType = {
  Plume: string;
  Flower: string;
  Sands: string;
  Circlet: string;
  Goblet: string;
  Set2: string;
  Set4: string;
};

export type SetBonusType = {
  [key: string]: {
    [key: number]: any;
  };
};

export type CharacterType = {
  name: string;
  name_zh: string;
  rarity: number;
  element: string[];
  weapon: string;
  sex: 'male' | 'female' | 'unknown';
  nation: string;
};
