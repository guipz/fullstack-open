import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "./Text";
import * as yup from 'yup';
import theme from "../Theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 10,
    rowGap: 10
  },
  submit: {
    textAlign: "center",
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 10,
    color: theme.colors.textOnPrimary,
    borderRadius: 5
  }
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
})

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput name={"username"} placeholder={"Username"}/>
            <FormikTextInput name={"password"} placeholder={"Password"} secureTextEntry/>
            <Pressable onPress={handleSubmit}>
              <Text fontWeight={"bold"} style={styles.submit}>Submit</Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
