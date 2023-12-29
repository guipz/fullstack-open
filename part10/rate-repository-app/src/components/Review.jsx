import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet, View } from "react-native";
import Button from "./Button";
import * as yup from "yup";
import theme from "../Theme";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    rowGap: 10,
  },
  submit: {
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .lessThan(100, "Rating must be less than 100")
    .moreThan(0, "Rating must be greater than 0")
    .required("Rating is required")
    .typeError("Rating must be an integer number"),
  text: yup.string(),
});

export const ReviewContainer = ({ onSubmit, result }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput
              name={"repositoryName"}
              placeholder={"Repository Name"}
            />
            <FormikTextInput
              name={"ownerName"}
              placeholder={"Repository Owner"}
            />
            <FormikTextInput
              name={"rating"}
              placeholder={"Rating"}
              keyboardType={"numeric"}
            />
            <FormikTextInput name={"text"} placeholder={"Review"} multiline />
            <Button
              onPress={handleSubmit}
              text={"Submit"}
              style={styles.submit}
              pressableProps={{ disabled: result.loading }}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const Review = () => {
  const [createMutation, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const result = await createMutation({
      variables: { review: { ...values, rating: Number(values.rating) } },
    });
    navigate(`/${result.data.createReview.repositoryId}`);
  };

  return <ReviewContainer onSubmit={onSubmit} result={result} />;
};

export default Review;
