import data from "../data/patients";
import {
  Patient,
  NonSensitivePatient,
  Entry,
  BaseEntry,
} from "../types/patient";
import { v4 as uuid } from "uuid";
import {
  isObject,
  validateDateField,
  validateDischargeField,
  validateGenderField,
  validateHealthCheckRatingField,
  validateSickLeaveField,
  validateStringArrayField,
  validateStringField,
} from "../utils/validators";

const MissingFieldsError = Error("Incorrect data: some fields are missing");

const patients = data as Patient[];

export const getAll = (): Patient[] => {
  return patients;
};

export const getById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

export const addNew = (object: unknown): Patient => {
  if (!isObject(object)) {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: Patient = {
      id: generateID(),
      name: validateStringField(object.name, "Name"),
      dateOfBirth: validateDateField(object.dateOfBirth, "Date of Birth"),
      ssn: validateStringField(object.dateOfBirth, "SSN"),
      gender: validateGenderField(object.gender, "Gender"),
      occupation: validateStringField(object.occupation, "Occupation"),
      entries: [],
    };
    return add(newPatient);
  }
  throw MissingFieldsError;
};

const add = (patient: Patient): Patient => {
  patients.push(patient);
  return patient;
};

export const addEntry = (id: string, object: unknown): Entry => {
  const patient = getById(id);
  if (!isObject(object)) {
    throw new Error("Incorrect or missing data");
  }
  if (!patient) {
    throw new Error("Patient not found");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const type = validateStringField(object.type, "Type");

    const newEntry: BaseEntry = {
      id: generateID(),
      description: validateStringField(object.description, "Description"),
      date: validateDateField(object.date, "Date"),
      specialist: validateStringField(object.specialist, "Specialist"),
    };

    if ("diagnosisCodes" in object) {
      newEntry.diagnosisCodes = validateStringArrayField(
        object.diagnosisCodes,
        "Diagnosis Codes"
      );
    }

    const entry: Entry = createEntry(newEntry, object, type);

    patient.entries.push(entry);
    return entry;
  }
  throw MissingFieldsError;
};

const createEntry = (
  newEntry: BaseEntry,
  data: Object,
  type: String
): Entry => {
  let entry: Entry;
  switch (type) {
    case "Hospital": {
      entry = {
        ...newEntry,
        type: "Hospital",
      };
      if ("discharge" in data) {
        entry.discharge = validateDischargeField(data.discharge, "Discharge");
      }
      break;
    }
    case "HealthCheck": {
      if (!("healthCheckRating" in data)) {
        throw MissingFieldsError;
      }
      entry = {
        ...newEntry,
        healthCheckRating: validateHealthCheckRatingField(
          data.healthCheckRating,
          "Health Check Rating"
        ),
        type: "HealthCheck",
      };
      break;
    }
    case "OccupationalHealthcare": {
      if (!("employerName" in data)) {
        throw MissingFieldsError;
      }
      entry = {
        ...newEntry,
        employerName: validateStringField(data.employerName, "Employer Name"),
        type: "OccupationalHealthcare",
      };
      if ("sickLeave" in data) {
        entry.sickLeave = validateSickLeaveField(data.sickLeave, "Sick Leave");
      }
      break;
    }
    default:
      throw new Error(`Incorrect Type: ${type}`);
  }
  return entry;
};

const generateID = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: unknown = uuid();
  if (id && typeof id === "string") {
    return id;
  }
  throw new Error("Error creating patient.");
};

export const getAllWithoutSensitiveData = (): NonSensitivePatient[] => {
  return getAll().map((p) => ({
    id: p.id,
    name: p.name,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    occupation: p.occupation,
  }));
};
