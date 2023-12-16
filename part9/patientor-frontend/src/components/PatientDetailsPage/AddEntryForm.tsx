import {
  Box,
  Button,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  useTheme,
  Theme,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { Diagnosis, EntryFormValues } from "../../types";
import React, { useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const AddEntryForm: React.FC<{
  onCancel: () => void;
  onSubmit: (newEntry: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}> = ({ onCancel, onSubmit, diagnoses }): React.JSX.Element => {
  const theme = useTheme();
  const typeField = useField("");
  const descriptionField = useField("");
  const dateField = useField("");
  const specialistField = useField("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRatingField, setHealthCheckRatingField] =
    useState<number>(2);
  const employerNameField = useField("");
  const sickLeaveStartField = useField("");
  const sickLeaveEndField = useField("");
  const dischargeDateField = useField("");
  const dischargeCriteriaField = useField("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const baseEntry = {
      description: descriptionField.formProps.value,
      date: dateField.formProps.value,
      specialist: specialistField.formProps.value,
      diagnosisCodes: diagnosisCodes,
    };

    let entry: EntryFormValues;

    switch (typeField.formProps.value) {
      case "Hospital": {
        entry = {
          ...baseEntry,
          type: typeField.formProps.value,
        };
        if (
          dischargeCriteriaField.formProps.value &&
          dischargeDateField.formProps.value
        ) {
          entry.discharge = {
            criteria: dischargeCriteriaField.formProps.value,
            date: dischargeDateField.formProps.value,
          };
        }
        break;
      }
      case "OccupationalHealthcare": {
        entry = {
          ...baseEntry,
          type: typeField.formProps.value,
          employerName: employerNameField.formProps.value,
        };
        if (
          sickLeaveEndField.formProps.value &&
          sickLeaveStartField.formProps.value
        ) {
          entry.sickLeave = {
            startDate: sickLeaveStartField.formProps.value,
            endDate: sickLeaveEndField.formProps.value,
          };
        }
        break;
      }
      case "HealthCheck":
        entry = {
          ...baseEntry,
          type: typeField.formProps.value,
          healthCheckRating: healthCheckRatingField - 1,
        };
        break;
      default:
        return;
    }

    onSubmit(entry);

    typeField.clean();
    descriptionField.clean();
    dateField.clean();
    specialistField.clean();
    employerNameField.clean();
    sickLeaveStartField.clean();
    sickLeaveEndField.clean();
    dischargeCriteriaField.clean();
    dischargeDateField.clean();
    setDiagnosisCodes([]);
    setHealthCheckRatingField(2);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function getStyles(code: string, diagnoses: string[], theme: Theme) {
    return {
      fontWeight:
        diagnoses.findIndex((c) => c === code) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1}>
        <TextField
          {...descriptionField.formProps}
          label="Description"
          required
          fullWidth
        />
        <TextField
          {...dateField.formProps}
          InputLabelProps={{
            shrink: true,
          }}
          label="Date"
          type="date"
          required
          fullWidth
        />
        <TextField
          {...specialistField.formProps}
          label="Specialist"
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            label="Diagnosis Codes"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodeChange}
            MenuProps={MenuProps}
          >
            {diagnoses.map((code) => (
              <MenuItem
                key={code.code}
                value={code.code}
                style={getStyles(code.code, diagnosisCodes, theme)}
              >
                {code.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            {...typeField.formProps}
            label="Type"
            required
            labelId="type-label"
          >
            <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
            <MenuItem value={"OccupationalHealthcare"}>
              Occupational Healthcare
            </MenuItem>
            <MenuItem value={"Hospital"}>Hospital</MenuItem>
          </Select>
        </FormControl>
        {typeField.formProps.value === "HealthCheck" && (
          <Box>
            <InputLabel id="health-check-rating-label">
              Health Check Rating
            </InputLabel>
            <Rating
              aria-labelledby="health-check-rating-label"
              value={healthCheckRatingField}
              onChange={(_, n) => setHealthCheckRatingField(n!)}
              getLabelText={(value: number) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              max={3}
              precision={1}
              icon={<Favorite color="primary" fontSize="inherit" />}
              emptyIcon={<FavoriteBorder fontSize="inherit" />}
            />
          </Box>
        )}
        {typeField.formProps.value === "OccupationalHealthcare" && (
          <>
            <TextField
              {...employerNameField.formProps}
              label="Employer Name"
              required
              fullWidth
            />
            <InputLabel>Sick Leave</InputLabel>
            <Grid container columnGap={1}>
              <Grid item>
                <TextField
                  {...sickLeaveStartField.formProps}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Start"
                  type="date"
                />
              </Grid>
              <Grid item>
                <TextField
                  {...sickLeaveEndField.formProps}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="End"
                  type="date"
                />
              </Grid>
            </Grid>
          </>
        )}
        {typeField.formProps.value === "Hospital" && (
          <>
            <InputLabel>Discharge</InputLabel>
            <Grid container>
              <Grid item xs={2}>
                <TextField
                  {...dischargeDateField.formProps}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Start"
                  type="date"
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  {...dischargeCriteriaField.formProps}
                  label="Criteria"
                  fullWidth
                />
              </Grid>
            </Grid>
          </>
        )}
        <div>
          <Button type="submit" variant="contained">
            Add
          </Button>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "right" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </Stack>
    </form>
  );
};

const useField = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChange = ({ target }: { target: { value: string } }) => {
    setValue(target.value);
  };

  return { formProps: { value, onChange }, clean: () => setValue("") };
};

export default AddEntryForm;
