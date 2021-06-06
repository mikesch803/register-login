import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    country: "",
  };

  const [reg, setReg] = useState(false);
  const inputData = useRef(null);
  const onSubmit = async (values) => {
    //e.preventDefault();
    // console.log(values);

    // console.log(inputData.current);
    const formData = new FormData(inputData.current);
    try {
      const response = await fetch(
        "http://api.kartmanage.in/public/api/user/registration",
        {
          method: "POST",
          body: formData,
        }
      );
      let result = await response.json();
      console.log({ result });
      setReg(true);
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("required!"),
    email: Yup.string().required("required!").email("invalid mail"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    password_confirmation: Yup.string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password doesn't match"
        ),
      }),
    phone_number: Yup.string().required("required!"),
    country: Yup.string().required("required!"),
  });
  const form = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  //console.log("visited field", form.touched);
  // console.log("form errors", form.errors);
  // console.log(form.values);
  return reg ? (
    <div>you are registered Please verify and check your email</div>
  ) : (
    <div className="App">
      <Link to="/">login</Link>
      <form onSubmit={form.handleSubmit} ref={inputData}>
        <input
          name="name"
          placeholder="name"
          type="text"
          {...form.getFieldProps("name")}
        />
        {form.touched.name && form.errors.name ? (
          <div className="error">{form.errors.name}</div>
        ) : null}
        <br />

        <input
          name="email"
          placeholder="email"
          type="text"
          {...form.getFieldProps("email")}
        />
        {form.touched.email && form.errors.email ? (
          <div className="error">{form.errors.email}</div>
        ) : null}
        <br />

        <input
          name="phone_number"
          placeholder="mob"
          type="number"
          {...form.getFieldProps("phone_number")}
        />
        {form.touched.phone_number && form.errors.phone_number ? (
          <div className="error">{form.errors.phone_number}</div>
        ) : null}
        <br />

        <input
          name="password"
          placeholder="password"
          type="password"
          {...form.getFieldProps("password")}
        />
        {form.touched.password && form.errors.password ? (
          <div className="error">{form.errors.password}</div>
        ) : null}
        <br />

        <input
          name="password_confirmation"
          placeholder="password_confirmation"
          type="password"
          {...form.getFieldProps("password_confirmation")}
        />
        {form.touched.password_confirmation &&
          form.errors.password_confirmation && (
            <div className="error">{form.errors.password_confirmation}</div>
          )}
        <br />
        <input
          name="country"
          placeholder="country"
          type="text"
          {...form.getFieldProps("country")}
        />
        {form.touched.country && form.errors.country && (
          <div className="error">{form.errors.country}</div>
        )}
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
