export type DropDownOptions = {
  value: string;
  label: string;
};

export const pageTypes = {
  ANALYTICS: "ANALYTICS",
  OPERATIONS: "OPERATIONS",
};

export const statusColor: any = {
  IDLE: "yellow",
  PRINTING: "teal",
};

export const deviceStatus = ["PRNT", "IDLE", "HMDTCHNG", "TMPCHNG"];

export const jobStatus = ["ABRT", "CMPLT", "PSD", "PRNT"];
