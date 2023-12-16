import React, { ReactElement, useEffect, useState } from "react";
import { Diagnosis, EntryFormValues, Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import { Box, Button, Typography } from "@mui/material";
import { Female, Male, QuestionMark } from "@mui/icons-material";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

const PatientDetailsPage = (): React.JSX.Element | null => {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [shouldShowAddEntryForm, setShouldShowAddEntryForm] = useState(false);

  const params = useParams();
  const userId = params.id;

  const handleSubmit = async (newEntry: EntryFormValues) => {
    const entry = await patientService.createEntry(userId!, newEntry);
    setCurrentPatient({
      ...currentPatient!,
      entries: currentPatient?.entries?.concat(entry),
    });
  };

  useEffect(() => {
    if (userId) {
      const fetchPatientDetails = async () => {
        const patient = await patientService.getById(userId);
        setCurrentPatient(patient);
      };
      void fetchPatientDetails();
    }
  }, [userId]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  if (!currentPatient) {
    return null;
  }

  let genderIcon: ReactElement;
  switch (currentPatient.gender) {
    case Gender.Female:
      genderIcon = <Female />;
      break;
    case Gender.Male:
      genderIcon = <Male />;
      break;
    case Gender.Other:
      genderIcon = <QuestionMark />;
      break;
  }

  return (
    <>
      <Typography variant="h4" style={{ margin: "1em 0em" }}>
        {currentPatient.name} {genderIcon}
      </Typography>
      <Typography variant="body1">
        SSH: {currentPatient.ssn ?? "No SSH"}
      </Typography>
      <Typography variant="body1">
        Occupation: {currentPatient.occupation}
      </Typography>
      {!shouldShowAddEntryForm && (
        <Button
          style={{ margin: "1em 0em" }}
          variant="contained"
          onClick={() => setShouldShowAddEntryForm(!shouldShowAddEntryForm)}
          color="primary"
        >
          Add Entry
        </Button>
      )}
      {shouldShowAddEntryForm && (
        <Box style={{margin: "1em 0em"}}>
        <AddEntryForm
          diagnoses={diagnoses}
          onCancel={() => setShouldShowAddEntryForm(!shouldShowAddEntryForm)}
          onSubmit={handleSubmit}
        />
        </Box>
      )}
      <Typography variant="h6" style={{ margin: "0em 0em" }}>
        Entries:
      </Typography>
      {currentPatient.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </>
  );
};

export default PatientDetailsPage;
