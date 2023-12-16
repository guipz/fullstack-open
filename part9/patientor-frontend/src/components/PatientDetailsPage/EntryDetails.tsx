import React, { ReactElement } from "react";
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { Card, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import assertNever from "assert-never";
import { green, orange, red, yellow } from "@mui/material/colors";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}): React.JSX.Element => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    default:
      assertNever(entry);
  }
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }): React.JSX.Element => {
  return (
    <EntryCardWrapper>
      <EntryHeader entry={entry} />
      <Typography variant="subtitle2">
        Employer Name: {entry.employerName}
      </Typography>
      {entry.sickLeave && (
        <Typography variant="subtitle2">
          Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      )}
      <DiagnosisCodesList
        diagnoses={diagnoses}
        diagnosisCodes={entry.diagnosisCodes}
      />
    </EntryCardWrapper>
  );
};

const HealthCheckEntryDetails: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }): React.JSX.Element => {
  return (
    <EntryCardWrapper>
      <EntryHeader entry={entry} />
      <HealthCheckEntryHeartIcon rating={entry.healthCheckRating} />
      <DiagnosisCodesList
        diagnoses={diagnoses}
        diagnosisCodes={entry.diagnosisCodes}
      />
    </EntryCardWrapper>
  );
};

const EntryCardWrapper: React.FC<{ children: (ReactElement | undefined)[] }> = (
  props
): React.JSX.Element => {
  return (
    <Card style={{ padding: "1.5em", margin: "1.0em 0" }}>
      {...props.children}
    </Card>
  );
};

const EntryHeader: React.FC<{ entry: Entry }> = ({
  entry,
}): React.JSX.Element => {
  return (
    <>
      <Typography variant="body1">{entry.description}</Typography>
      <Typography variant="subtitle2">
        Diagnose by {entry.specialist} in {entry.date}
      </Typography>
    </>
  );
};

const HealthCheckEntryHeartIcon: React.FC<{ rating: HealthCheckRating }> = ({
  rating,
}): React.JSX.Element => {
  let color: string;
  switch (rating) {
    case HealthCheckRating.CriticalRisk:
      color = red["800"];
      break;
    case HealthCheckRating.HighRisk:
      color = orange["800"];
      break;
    case HealthCheckRating.LowRisk:
      color = yellow["800"];
      break;
    case HealthCheckRating.Healthy:
      color = green["800"];
      break;
  }
  return <Favorite style={{ color: color }} />;
};

const DiagnosisCodesList: React.FC<{
  diagnosisCodes: string[] | undefined;
  diagnoses: Diagnosis[];
}> = ({ diagnosisCodes, diagnoses }): React.JSX.Element => {
  return (
    <List dense={true}>
      {diagnosisCodes?.map((code) => (
        <ListItem key={code}>
          <ListItemText
            primary={code}
            secondary={
              diagnoses.find((d) => d.code === code)?.name ?? "No description"
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

const HospitalEntryDetails: React.FC<{
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }): React.JSX.Element => {
  return (
    <EntryCardWrapper>
      <EntryHeader entry={entry} />
      {entry.discharge && (
        <Typography variant="subtitle2">
          Discharge: {entry.discharge.date} Criteria: {entry.discharge.criteria}
        </Typography>
      )}
      <DiagnosisCodesList
        diagnoses={diagnoses}
        diagnosisCodes={entry.diagnosisCodes}
      />
    </EntryCardWrapper>
  );
};

export default EntryDetails;
