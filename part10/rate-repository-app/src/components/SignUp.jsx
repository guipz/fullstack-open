import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet, View } from "react-native";
import useSignIn from "../hooks/useSignIn";
import Button from "./Button";
import * as yup from "yup";
import theme from "../Theme";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

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
  username: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username length must be greater than 5")
    .max(30, "Username length must be less than 30")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password length must be greater than 5")
    .max(30, "Password length must be less than 30")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password don't match")
    .required("Password confirm is required"),
});

export const SignUpContainer = ({ onSubmit, result }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput name={"username"} placeholder={"Username"} />
            <FormikTextInput
              name={"password"}
              placeholder={"Password"}
              secureTextEntry
            />
            <FormikTextInput
              name={"confirmPassword"}
              placeholder={"Confirm Password"}
              secureTextEntry
            />
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

const SignUp = () => {
  const [createMutation, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { password, username } = values;
    await createMutation({ variables: { user: { password, username } } });
    await signIn({ password, username });
    navigate("/");
  };

  return <SignUpContainer onSubmit={onSubmit} result={result} />;
};

export default SignUp;
