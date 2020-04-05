export interface ResponseInformation {
  status: number;
  message?: string;
}

export interface ResponseInformationDefinition {
  [key: string]: ResponseInformation;
}

export interface Roles {
  [key: string]: {
    name: string;
  };
}
