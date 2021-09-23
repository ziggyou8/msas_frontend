import React, { useState } from "react";
import { FormGroup, FormText, Input, Label, CustomInput } from "reactstrap";
import { Field } from "redux-form";

const FormInput = ({
  input,
  label,
  type,
  options,
  id,
  name,
  accept,
  inputPlaceHolder,
  maxDate,
  max,
  minDate,
  disabled,
  customId,
  multiple,
  value,
  meta: { error, touched },
}) => {
  if (type === "select") {
    return (
      <FormGroup>
        <Label htmlFor={id}>{label}</Label>
        <CustomInput   customId={customId} multiple={multiple} disabled={disabled} type={type} {...input}>
          <option key={0} value="">
            Cliquez pour sélectionner
          </option>
          {options.map((el, i) => {
            return (
                el
            );
          })}
        </CustomInput>
        {touched && (
          <FormText className="help-block error-color erreurMessage">
            {error}
          </FormText>
        )}
      </FormGroup>
    );
  }
 /*  if (type === "checkbox") {
    return (
      <FormGroup check>
        <Label check htmlFor={id}>{label}</Label>
        {options.map((el, i) => {
          return (
            <FormGroup  key={el[0]} check>
              <Label check>
                <Field 
                  key={el[0]}
                  component="input"
                  type="checkbox"
                  name={el[0]}
                  id={el[0]}
                  onChange={input.onChange}
                />{" "}
                {el[1]}
              </Label>
            </FormGroup>
          );
        })}
        {touched && (
          <FormText className="help-block error-color erreurMessage">
            {error}
          </FormText>
        )}
      </FormGroup>
    );
  } */

  if (type === "checkbox") {
    return (
      <div check>
           <FormGroup>
                <Label  for={customId}>
                <div  style={{ marginTop:'-4px', marginRight:'-15px', marginLeft:'1px'}}>
                <CustomInput 
                    id={customId} 
                    inline
                    type="checkbox"
                    type={type} {...input}
                    onChange={input.onChange} />
                </div>
                 </Label>{label}
      </FormGroup>
        {touched && (
          <FormText className="help-block error-color erreurMessage">
            {error}
          </FormText>
        )}
      </div>
    );
  }
  if (type === "file") {
    return (
      <FormGroup>
        <Label htmlFor={id}>{label}</Label>
        <FormGroup>
          <CustomInput
            type="file"
            name={name}
            value={name}
            onChange={input.onChange}
            accept={accept}
          />
        </FormGroup>
          {touched && (
            <FormText className="help-block error-color erreurMessage">
              {error}
            </FormText>
          )}
      </FormGroup>
    );
  }
  if (type === "radio") {
    return (
      <FormGroup>
        <FormGroup check key={0.1}>
          <Label check key={0.1}>
            <Field
              component="input"
              type={type}
              name={input.name}
              value="oui"
              onChange={input.onChange}
            />{" "}
            Oui
          </Label>
        </FormGroup>
        <FormGroup check key={0.2}>
          <Label check key={0.2}>
            <Field
              component="input"
              type={type}
              name={input.name}
              value="non"
              onChange={input.onChange}
            />{" "}
            Non
          </Label>
        </FormGroup>
        {touched && (
          <FormText className="help-block error-color erreurMessage">
            {error}
          </FormText>
        )}
      </FormGroup>
    );
  }
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input   valid={input.value}
      disabled={disabled}
        {...input}
        type={type}
        placeholder={inputPlaceHolder}
        max={type === "number" ? max : null}
        min={type === "number" ? "0" : minDate}
      />
      {touched && (
        <FormText className="help-block error-color erreurMessage">
          {error}
        </FormText>
      )}
    </FormGroup>
  );
};

export default FormInput;