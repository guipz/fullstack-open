import {
  Discharge,
  Entry,
  Gender,
  HealthCheckRating,
  SickLeave,
} from "../types/patient";

export const validateStringField = (
  value: unknown,
  fieldName: string
): string => {
  if (isString(value)) {
    return value;
  }
  throw new Error(`Incorrect ${fieldName}: ${value}`);
};

export const validateDateField = (
  value: unknown,
  fieldName: string
): string => {
  if (isString(value) && isDateString(value)) {
    return value;
  }
  throw new Error(`Incorrect ${fieldName}: ${value}`);
};

export const validateGenderField = (
  value: unknown,
  fieldName: string
): Gender => {
  if (isString(value) && isGender(value)) {
    return value;
  }
  throw new Error(`Incorrect ${fieldName}: ${value}`);
};

export const validateHealthCheckRatingField = (
  value: unknown,
  fieldName: string
): HealthCheckRating => {
  if (isNumber(value) && isHealthCheckRating(value)) {
    return value;
  }
  throw new Error(`Incorrect ${fieldName}: ${value}`);
};

export const validateDischargeField = (
  value: unknown,
  fieldName: string
): Discharge => {
  if (!isObject(value) || !("criteria" in value) || !("date" in value)) {
    throw new Error(`Incorrect or missing data in ${fieldName}`);
  }
  return {
    criteria: validateStringField(value.criteria, `Criteria in ${fieldName}`),
    date: validateDateField(value.date, `Date in ${fieldName}`),
  };
};

export const validateSickLeaveField = (
  value: unknown,
  fieldName: string
): SickLeave => {
  if (!isObject(value) || !("endDate" in value) || !("startDate" in value)) {
    throw new Error(`Incorrect or missing data in ${fieldName}`);
  }
  return {
    endDate: validateStringField(value.endDate, `End Date in ${fieldName}`),
    startDate: validateDateField(
      value.startDate,
      `Start Date  in ${fieldName}`
    ),
  };
};

export const validateStringArrayField = (
  value: unknown,
  fieldName: string
): string[] => {
  if (!Array.isArray(value)) {
    throw new Error(`Incorrect ${fieldName}: ${value}`);
  }
  const badElements = value.filter((e) => !isString(e));
  if (badElements.length !== 0) {
    throw new Error(`Incorrect Element(s) in ${fieldName}: ${badElements}`);
  }
  return value;
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(value);
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((g) => g)
    .includes(value);
};

export const isObject = (value: unknown): value is Object => {
  return Boolean(value) && typeof value === "object";
};

const isNumber = (value: unknown): value is number => {
  return !isNaN(Number(value));
};

const isDateString = (value: string): boolean => {
  return Boolean(Date.parse(value));
};

const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};
