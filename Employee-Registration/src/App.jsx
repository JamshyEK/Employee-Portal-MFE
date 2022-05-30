import React from "react";
import ReactDOM from "react-dom";

import employeeService from "../../Service/services";
import "./index.css";

/**
 *
 * @param {{name; label; type: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>['type']}} param0
 * @returns
 */
const FieldSet = ({ name, type, label, value, ...rest }) => (
  <div style={{ display: "table-row" }}>
    <label style={{ display: "table-cell" }} htmlFor={name}>
      {label}
    </label>
    <input
      style={{ display: "table-cell", margin: "2px" }}
      type={type}
      name={name}
      id={name}
      value={value}
      {...rest}
    />
  </div>
);

const RegistrationPage = () => {
  const initialData = {
    dob: "",
    email: "",
    username: "",
    password: "",
  };
  const [data, setData] = React.useState(initialData);
  const [status, setStatus] = React.useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    employeeService
      .addEmployee(data)
      .then(() => {
        setData(initialData);
        alert("Employee Added Successfully!");
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        setStatus("");
      });
  }

  return (
    <form
      style={{ display: "table" }}
      onChange={handleChange}
      onSubmit={handleSubmit}>
      <FieldSet name='dob' type='date' label='Birthday' value={data.dob} />
      <FieldSet name='email' type='email' label='Email' value={data.email} />
      <FieldSet name='username' label='Username' value={data.username} />
      <FieldSet
        name='password'
        type='password'
        label='Password'
        value={data.password}
        autoComplete='new-password'
      />

      <div>
        <button type='submit' disabled={status.status === "loading"}>
          Register
        </button>
      </div>
    </form>
  );
};

export { RegistrationPage };

export default () => {
  ReactDOM.render(<RegistrationPage />, document.getElementById("app"));
};
