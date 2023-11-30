import { useEffect, useState } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from "reactstrap";
import * as Yup from "yup";
import axios from "axios";

const Form = (props) => {
  const { list, setlist, adduser } = props;

  const initForm = {
    fullname: "",
    email: "",
    password: "",
    active: "",
  };

  const [formState, setFormState] = useState(initForm);
  const [errState, setErrState] = useState({
    fullname: "",
    email: "",
    password: "",
    active: "",
  });
  const [isValid, setIsValid] = useState(false);

  const formSchema = Yup.object().shape({
    fullname: Yup.string()
      .required("Fullname Required")
      .min(3, "minimum 3 characters"),
    email: Yup.string()
      .email("Please Enter Valid Email")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Is Requiored")
      .matches(
        "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$",
        "Enter Valid Password"
      ),
    active: Yup.boolean().oneOf([true], "Accept Terms"),
  });

  const inputChangeHandler = (event) => {
    const key = event.target.name;
    const value =
      event.target.name === "active"
        ? event.target.checked
        : event.target.value;

    Yup.reach(formSchema, key)
      .validate(value)
      .then((r) => {
        setErrState({ ...errState, [key]: "" });
      })
      .catch((e) => {
        setErrState({ ...errState, [key]: e.message });
      });

    setFormState({ ...formState, [key]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValid) {
      axios
        .post("https://reqres.in/api/users", formState)
        .then((res) => {
          console.log(res);
          adduser(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setIsValid(valid);
    });
  }, [formState]);

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Fullname:</Label>
        <Input
          invalid={!!errState.fullname}
          type="text"
          value={formState.fullname}
          name="fullname"
          onChange={inputChangeHandler}
        />
        <FormFeedback>{errState.fullname}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Email:</Label>
        <Input
          invalid={!!errState.email}
          type="email"
          value={formState.email}
          name="email"
          onChange={inputChangeHandler}
        />
        <FormFeedback>{errState.email}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Password:</Label>
        <Input
          invalid={!!errState.password}
          type="password"
          value={formState.password}
          name="password"
          onChange={inputChangeHandler}
        />
        <FormFeedback>{errState.password}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Terms of Service:</Label>
        <Input
          type="checkbox"
          checked={formState.active}
          name="active"
          onChange={inputChangeHandler}
        />
      </FormGroup>
      <Button disabled={!isValid} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Form;
