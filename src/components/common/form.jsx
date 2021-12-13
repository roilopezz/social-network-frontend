import React, { Component } from "react";
import Input from "./input";
import Joi from "joi";
import TextArea from "./textArea";

// AddAPhotoIcon
class Form extends Component {
  validateForm = () => {
    const {
      schema,
      state: { form },
    } = this;

    const { error } = Joi.object({ ...schema }).validate(form, {
      abortEarly: false,
    });

    if (!error) {
      return null;
    }

    const errors = {};

    for (const details of error.details) {
      errors[details.path[0]] = details.message;
    }

    return errors;
  };

  // check if the inputs is validate
  validateInput = ({ name, value }) => {
    const data = {
      [name]: value,
    };

    const schema = Joi.object({
      [name]: this.schema[name],
    });

    const { error } = schema.validate(data);

    return error ? error.details[0].message : null;
  };

  // take the values from the inputs
  handleChange = ({ target }) => {
    const { form, errors } = this.state;

    if (target.type === "file") {
      const image = target.files[0];

      return this.setState({
        form: {
          ...form,
          image,
        },
        errors: { ...errors, [target.name]: this.validateInput(target) },
      });
    }

    if (target.id === "lastName") {
      return this.setState({
        form: { ...form, [target.name]: target.value.toLowerCase().trim() },
        errors: { ...errors, [target.name]: this.validateInput(target) },
      });
    }

    if (target.id === "name") {
      return this.setState({
        form: { ...form, [target.name]: target.value.toLowerCase().trim() },
        errors: { ...errors, [target.name]: this.validateInput(target) },
      });
    }

    return this.setState({
      form: {
        ...form,
        [target.name]: target.value.toLowerCase(),
      },
      errors: { ...errors, [target.name]: this.validateInput(target) },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors });

    if (errors) {
      return;
    }

    this.doSubmit();
  };

  renderInput({ type = "text", name, placeholder }) {
    const { form, errors } = this.state;

    return (
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        onInput={this.handleChange}
        value={form[name]}
        error={errors && errors[name]}
      />
    );
  }

  renderTextArea({ type = "text", name, placeholder, rows }) {
    const { form, errors } = this.state;
    return (
      <TextArea
        type={type}
        placeholder={placeholder}
        name={name}
        onInput={this.handleChange}
        value={form[name]}
        error={errors && errors[name]}
        rows={rows}
      />
    );
  }
}

export default Form;
