import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet, View } from "react-native";
import useSignIn from "../hooks/useSignIn";
import Button from "./Button";
import * as yup from "yup";
import theme from "../Theme";
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
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInContainer = ({ onSubmit, result }) => {
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

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await signIn({ username: values.username, password: values.password });
    navigate("/");
  };

  return <SignInContainer onSubmit={onSubmit} result={result} />;
};

export default SignIn;
