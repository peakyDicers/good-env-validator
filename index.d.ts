interface GoodVars {
  name: string;
  required: {
    dev: boolean;
    staging: boolean;
    prod: boolean;
  };
}
export function validate(vars: GoodVars[]): void;
