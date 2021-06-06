import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { Redirect, Link } from "react-router-dom";

export default function Login() {
  const initialValues = {
    username: "",
    password: "",
  };
  const inputData = useRef(null);

  const [login, setLogin] = useState(false);

  const onSubmit = async (values) => {
    //e.preventDefault();
    // console.log(values);
    // console.log(username === inputData.current.username.value )
    // console.log(inputData.current);
    const formData = new FormData(inputData.current);
    try {
      const response = await fetch(
        "http://api.kartmanage.in/public/api/user/login",
        {
          method: "POST",
          body: formData,
        }
      );
      let result = await response.json();
      //console.log({ result });
      //console.log(result);
      //console.log("token ", result.data.access_token);
      localStorage.setItem("access_token", result.data.access_token);
      setLogin(true);
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("required!").email("invalid mail"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  });

  const form = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  //console.log("visited field", form.touched);
  // console.log("form errors", form.errors);
  // console.log(form.values);
  return login ? (
    <>
      <Redirect to="/Welcome" />{" "}
    </>
  ) : (
    <div className="App">
      <Link to="/Register">register</Link>
      <form onSubmit={form.handleSubmit} ref={inputData}>
        <input
          name="username"
          placeholder="email"
          type="text"
          {...form.getFieldProps("username")}
        />
        {form.touched.username && form.errors.username ? (
          <div className="error">{form.errors.username}</div>
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
          type="hidden"
          name="client_id"
          value="938398f5-6e5c-43d0-abcf-2d8a3a1e91fb"
          required
        />
        <input
          type="hidden"
          name="client_secret"
          value="XNxgjTVar1Mw0zbsGYpaN8fjwcw9EKs6zzCWrCO7"
          required
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
