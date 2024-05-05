import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useState } from "react"; 
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); 

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "Too Short!")
      .max(38, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .email("You must enter valid email address!")
      .required("Required"),
    password: Yup.string()
      .min(7, "Too Short!")
      .max(38, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    setIsLoading(true); 
    try {
      await dispatch(register(values));
      setIsLoading(false); 
      actions.resetForm();
      toast.success('Registration successful. Please log in', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toast-success'
      });
    } catch (error) {
      setIsLoading(false);
      toast.error('Registration failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toast-error'
      });
    }
  };

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
        {({ isSubmitting }) => (
      <Form className={css.form}>
        <label className={css.formTitle} htmlFor={nameId}>
          Name
        </label>
        <Field
          className={css.formInput}
          type="text"
          name="name"
          id={nameId}
          placeholder="Enter your name"
        />
        <ErrorMessage
          className={css.errorMassage}
          name="name"
          component="span"
        />
        <label className={css.formTitle} htmlFor={emailId}>
          Email
        </label>
        <Field
          className={css.formInput}
          type="email"
          name="email"
          id={emailId}
          placeholder="Enter your email"
        />
        <ErrorMessage
          className={css.errorMassage}
          name="email"
          component="span"
        />
        <label className={css.formTitle} htmlFor={passwordId}>
          Password
        </label>
        <Field
          className={css.formInput}
          type="password"
          name="password"
          id={passwordId}
          placeholder="Enter your password"
        />
        <ErrorMessage
          className={css.errorMassage}
          name="password"
          component="span"
        />
        <button className={css.formBtn} type="submit"  disabled={isSubmitting}>
              {isLoading ? 'Loading...' : 'Register'}
   
        </button>
      </Form>
        )}
    </Formik>
    <ToastContainer/>
    </>
  );
};

export default RegistrationForm;
