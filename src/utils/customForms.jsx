import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {countryCodes} from "./countryCodes";

/*
  These form components aim to provide clarity and ease of use for react-bootstrap. Instead of having a general Form.Control
  that allows customization, these controls handles the customization with the trade of an easy-to-use component creation method.
  These forms require two useStates to control and a custom onChange handler all provided in the template below.


****************************************************************************************************

// Template including all requirements for using customForms.jsx
import {customValidation} from './utils/customForms'; // Update the path to match how it's nested in your file.
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from "react";

function SampleForm() {
  const [data, setData] = useState({}) //Create a dict with blank or default values matching the name fo each form component.
  const [validated, setValidated] = useState(customValidation(data))
  const [showValidation, setShowValidation] = useState(false)


  const handleChange = (event, key, value, validation) => {
    setData(prevState => ({...prevState, [key]: value}))
    setValidated(prevState => ({...prevState, [key]: validation}))
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    const isFormValid = Object.values(validated).every(valid => valid === true)
    if (!isFormValid) {
      //Invalid form workflow
      setShowValidation(true)
      return;
    } else {
      //Valid form workflow
      setShowValidation(true)
      return;
    }
  }

  return(
    <Form noValidate onSubmit={handleSubmit}>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}
export default SampleForm;

 */

/**
 *
 * @param id - str: Reference name of the component. This should match its name in the object storing values.
 * @param name - str: Another reference type. By default, this is set to the same as the id.
 * @param onChange - function: Actions to preform when value within this component change. For ease, use the template in this file.
 * @param plaintext - boolean: Enables or disables formatting of the component to appear as just test.
 * @param readOnly - boolean: Enables or disables editing while keeping interactivity e.g. cursor will blink when enabled.
 * @param disabled - boolean: Enables or disables the component completely. The component won't be clickable nor interactive.
 * @param valid - boolean: Enables and disables valid and non-valid visual aids. This should be managed by a [validated, setValidated] useState.
 * @param placeholder - str: Default text to show users without holding a value within the component.
 * @param className - str | obj: Css/bootstrap classes customizations that can be passed.
 * @param size - str: The form control can be made larger with the "lg" keyword or smaller with the "sm" keyword.
 * @param style - str | obj: Css that can be directly added to the form control.
 * @param pattern - regex str: Custom regex pattern providing a specific input for validation.
 * @param required - boolean: Enables or disables checking validation for this input. Default is false.
 * @param showValidation - boolean: A second trigger for validation. This focuses on enabling validation after submission.
 * @param minLength - int: The least amount of characters required. Default is set to 1.
 * @param maxLength - int: The most amount of characters accepted. Default is set to 9999
 * @returns {JSX.Element}
 * @constructor
 *
 */
export const Text = ({
  id,
  name=id,
  onChange,
  plaintext=false,
  readOnly=false,
  disabled=false,
  valid,
  placeholder,
  className,
  size,
  style,
  pattern='.*',
  required=false,
  showValidation=false,
  minLength=1,
  maxLength=9999
}) => {

  /**
   * Handles updating validation for patterns and length checks.
   * @param event
   */
  const handleChange = (event) => {
    let key = event.target.name
    let value = event.target.value
    let checkValid = patternValidation(pattern, value, minLength, required)
    onChange(event, key, value, checkValid)
  }

  return (
    <Form.Control
      id={id}
      name={name}
      type='text'
      onChange={handleChange}
      plaintext={plaintext}
      readOnly={readOnly}
      disabled={disabled}
      isValid={showValidation && valid}
      isInvalid={showValidation && !valid}
      placeholder={placeholder}
      className={className}
      size={size}
      style={style}
      pattern={pattern}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
  )
}



/**
 *
 * @param id - str: Reference name of the component. This should match its name in the object storing values.
 * @param name - str: Another reference type. By default, this is set to the same as the id.
 * @param onChange - function: Actions to preform when value within this component change. For ease, use the template in this file.
 * @param plaintext - boolean: Enables or disables formatting of the component to appear as just test.
 * @param readOnly - boolean: Enables or disables editing while keeping interactivity e.g. cursor will blink when enabled.
 * @param disabled - boolean: Enables or disables the component completely. The component won't be clickable nor interactive.
 * @param valid - boolean: Enables and disables valid and non-valid visual aids. This should be managed by a [validated, setValidated] useState.
 * @param placeholder - str: Default text to show users without holding a value within the component.
 * @param className - str | obj: Css/bootstrap classes customizations that can be passed.
 * @param size - str: The form control can be made larger with the "lg" keyword or smaller with the "sm" keyword.
 * @param style - str | obj: Css that can be directly added to the form control.
 * @param pattern - regex str: Custom regex pattern providing a specific input for validation.
 * @param required - boolean: Enables or disables checking validation for this input. Default is false.
 * @param showValidation - boolean: A second trigger for validation. This focuses on enabling validation after submission.
 * @param minLength - int: The least amount of characters required. Default is set to 1.
 * @param maxLength - int: The most amount of characters accepted. Default is set to 9999
 * @returns {JSX.Element}
 * @constructor
 */
export const Email = ({
  id,
  name=id,
  onChange,
  plaintext=false,
  readOnly=false,
  disabled=false,
  valid,
  placeholder,
  className,
  size,
  style,
  pattern='^[a-zA-Z0-9._\\-+%]+@[a-zA-Z0-9.\\-]+[.][.a-zA-Z]{2,}$',
  required=false,
  showValidation=false,
  minLength=1,
  maxLength=9999
}) => {

  /**
   * Handles updating validation for patterns and length checks.
   * @param event
   */
  const handleChange = (event) => {
    let key = event.target.name
    let value = event.target.value
    let checkValid = patternValidation(pattern, value, minLength, required)
    onChange(event, key, value, checkValid)
  }

  return (
    <Form.Control
      id={id}
      name={name}
      type='email'
      onChange={handleChange}
      plaintext={plaintext}
      readOnly={readOnly}
      disabled={disabled}
      isValid={showValidation && valid}
      isInvalid={showValidation && !valid}
      placeholder={placeholder}
      className={className}
      size={size}
      style={style}
      pattern={pattern}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      inputMode='email'
    />
  )
}



/**
 *
 * @param id - str: Reference name of the component. This should match its name in the object storing values.
 * @param name - str: Another reference type. By default, this is set to the same as the id.
 * @param onChange - function: Actions to preform when value within this component change. For ease, use the template in this file.
 * @param plaintext - boolean: Enables or disables formatting of the component to appear as just test.
 * @param readOnly - boolean: Enables or disables editing while keeping interactivity e.g. cursor will blink when enabled.
 * @param disabled - boolean: Enables or disables the component completely. The component won't be clickable nor interactive.
 * @param valid - boolean: Enables and disables valid and non-valid visual aids. This should be managed by a [validated, setValidated] useState.
 * @param placeholder - str: Default text to show users without holding a value within the component.
 * @param className - str | obj: Css/bootstrap classes customizations that can be passed.
 * @param size - str: The form control can be made larger with the "lg" keyword or smaller with the "sm" keyword.
 * @param style - str | obj: Css that can be directly added to the form control.
 * @param pattern - regex str: Custom regex pattern providing a specific input for validation.
 * @param required - boolean: Enables or disables checking validation for this input. Default is false.
 * @param showValidation - boolean: A second trigger for validation. This focuses on enabling validation after submission.
 * @param minLength - int: The least amount of characters required. Default is set to 1.
 * @param maxLength - int: The most amount of characters accepted. Default is set to 9999
 * @returns {JSX.Element}
 * @constructor
 */
export const Password = ({
  id,
  name=id,
  onChange,
  plaintext=false,
  readOnly=false,
  disabled=false,
  valid,
  placeholder,
  className,
  size,
  style,
  pattern='.*',
  required=false,
  showValidation=false,
  minLength=1,
  maxLength=9999
}) => {

  /**
   * Handles updating validation for patterns and length checks.
   * @param event
   */
  const handleChange = (event) => {
    let key = event.target.name
    let value = event.target.value
    let checkValid = patternValidation(pattern, value, minLength, required)
    onChange(event, key, value, checkValid)
  }

  return (
    <Form.Control
      id={id}
      name={name}
      type='password'
      onChange={handleChange}
      plaintext={plaintext}
      readOnly={readOnly}
      disabled={disabled}
      isValid={showValidation && valid}
      isInvalid={showValidation && !valid}
      placeholder={placeholder}
      className={className}
      size={size}
      style={style}
      pattern={pattern}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
    />
  )
}


/**
 *
 * @param id - str: Reference name of the component. This should match its name in the object storing values.
 * @param name - str: Another reference type. By default, this is set to the same as the id.
 * @param onChange - function: Actions to preform when value within this component change. For ease, use the template in this file.
 * @param plaintext - boolean: Enables or disables formatting of the component to appear as just test.
 * @param readOnly - boolean: Enables or disables editing while keeping interactivity e.g. cursor will blink when enabled.
 * @param disabled - boolean: Enables or disables the component completely. The component won't be clickable nor interactive.
 * @param valid - boolean: Enables and disables valid and non-valid visual aids. This should be managed by a [validated, setValidated] useState.
 * @param placeholder - str: Default text to show users without holding a value within the component.
 * @param className - str | obj: Css/bootstrap classes customizations that can be passed.
 * @param size - str: The form control can be made larger with the "lg" keyword or smaller with the "sm" keyword.
 * @param style - str | obj: Css that can be directly added to the form control.
 * @param pattern - regex str: Custom regex pattern providing a specific input for validation.
 * @param required - boolean: Enables or disables checking validation for this input. Default is false.
 * @param showValidation - boolean: A second trigger for validation. This focuses on enabling validation after submission.
 * @param minLength - int: The least amount of characters required. Default is set to 1.
 * @param maxLength - int: The most amount of characters accepted. Default is set to 9999
 * @returns {JSX.Element}
 * @constructor
 */
export const BasicPhone = ({
  id,
  name=id,
  onChange,
  plaintext=false,
  readOnly=false,
  disabled=false,
  valid,
  placeholder,
  className,
  size,
  style,
  pattern='.*',
  required=false,
  showValidation=false,
  minLength,
  maxLength
}) => {

  /**
   * Handles updating validation for patterns and length checks.
   * @param event
   */
  const handleChange = (event) => {
    let key = event.target.name
    let value = event.target.value
    let checkValid = patternValidation(pattern, value, minLength, required)
    onChange(event, key, value, checkValid)
  }

  return (
    <Form.Control
      id={id}
      name={name}
      type='text'
      onChange={handleChange}
      plaintext={plaintext}
      readOnly={readOnly}
      disabled={disabled}
      isValid={showValidation && valid}
      isInvalid={showValidation && !valid}
      placeholder={placeholder}
      className={className}
      size={size}
      style={style}
      pattern={pattern}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      inputMode='tel'
    />
  )
}


/**
 *
 * @param id - str: Reference name of the component. This should match its name in the object storing values.
 * @param name - str: Another reference type. By default, this is set to the same as the id.
 * @param onChange - function: Actions to preform when value within this component change. For ease, use the template in this file.
 * @param plaintext - boolean: Enables or disables formatting of the component to appear as just test.
 * @param readOnly - boolean: Enables or disables editing while keeping interactivity e.g. cursor will blink when enabled.
 * @param disabled - boolean: Enables or disables the component completely. The component won't be clickable nor interactive.
 * @param valid - boolean: Enables and disables valid and non-valid visual aids. This should be managed by a [validated, setValidated] useState.
 * @param placeholder - str: Default text to show users without holding a value within the component.
 * @param className - str | obj: Css/bootstrap classes customizations that can be passed.
 * @param size - str: The form control can be made larger with the "lg" keyword or smaller with the "sm" keyword.
 * @param style - str | obj: Css that can be directly added to the form control.
 * @param pattern - regex str: Custom regex pattern providing a specific input for validation.
 * @param required - boolean: Enables or disables checking validation for this input. Default is false.
 * @param showValidation - boolean: A second trigger for validation. This focuses on enabling validation after submission.
 * @param minLength - int: The least amount of characters required. Default is set to 1.
 * @param maxLength - int: The most amount of characters accepted. Default is set to 9999
 * @param screenBreaks - array: A list of 5 column breaks to format the country code drop down. This array
 *                      requires a xs, sm, md, lg, and xl page breaks. Default is [5,3,3,2,2]
 * @returns {JSX.Element}
 * @constructor
 */
export const PhoneCountryAware = ({
  id,
  name,
  onChange,
  plaintext=false,
  readOnly=false,
  disabled=false,
  valid,
  placeholder,
  className,
  size,
  style,
  pattern='[0-9]{1,}',
  required=false,
  showValidation=false,
  minLength,
  maxLength,
  screenBreaks=[5,3,3,2,2]
}) => {

  /**
   * Handles updating validation for patterns and length checks.
   * @param event
   */
  const handleChange = (event) => {
    let key = event.target.name
    let phoneNumber = document.getElementById(`${id}`).value
    let country = document.getElementById(`${id}-country`).value
    let fullNumber = country + phoneNumber
    let checkValid = patternValidation(pattern, phoneNumber, minLength, required)
    onChange(event, key, fullNumber, checkValid)
  }

  return (
    <Row>
      <Col xs={screenBreaks[0]} sm={screenBreaks[1]} md={screenBreaks[2]} lg={screenBreaks[3]} xl={screenBreaks[4]}>
        <Form.Select id={`${id}-country`} name={name} onChange={handleChange}>
          {countryCodes.map((country, index) => {
            return <option key={index} value={country['code']}>{country['code']} ({country['country']})</option>
          })}
        </Form.Select>
      </Col>
      <Col
        xs={screenBreaks[0] === 12 ? screenBreaks[0] : (12 - screenBreaks[0])}
        sm={screenBreaks[1] === 12 ? screenBreaks[1] : (12 - screenBreaks[1])}
        md={screenBreaks[2] === 12 ? screenBreaks[2] : (12 - screenBreaks[2])}
        lg={screenBreaks[3] === 12 ? screenBreaks[3] : (12 - screenBreaks[3])}
        xl={screenBreaks[4] === 12 ? screenBreaks[4] : (12 - screenBreaks[4])}
      >
        <Form.Control
          id={`${id}`}
          name={name}
          type='text'
          onChange={handleChange}
          plaintext={plaintext}
          readOnly={readOnly}
          disabled={disabled}
          isValid={showValidation && valid}
          isInvalid={showValidation && !valid}
          placeholder={placeholder}
          className={className}
          size={size}
          style={style}
          pattern={pattern}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          inputMode={'tel'}
        />
      </Col>
    </Row>
  )
}


/**
 *
 * @param id - str: Reference name of the component. This should match its name in the object storing values.
 * @param name - str: Another reference type. By default, this is set to the same as the id.
 * @param valueList - array: List of values to populate the dropdown menu options as their value to be saved.
 * @param optionsList - array: List of values to populate the dropdown menu options visible to the end user. The default is set to valueList, but a custom formatted version
 * can be passed to be used.
 * @param onChange - function: Actions to preform when value within this component change. For ease, use the template in this file.
 * @param disabled - boolean: Enables or disables the component completely. The component won't be clickable nor interactive.
 * @param valid - boolean: Enables and disables valid and non-valid visual aids. This should be managed by a [validated, setValidated] useState.
 * @param className - str | obj: Css/bootstrap classes customizations that can be passed.
 * @param style - str | obj: Css that can be directly added to the form control.
 * @param required - boolean: Enables or disables checking validation for this input. Default is false.
 * @param showValidation - boolean: A second trigger for validation. This focuses on enabling validation after submission.
 * @returns {JSX.Element}
 * @constructor
 */
export const Dropdown = ({
  id,
  name=id,
  valueList,
  optionsList=valueList,
  onChange,
  disabled=false,
  valid,
  className,
  style,
  required=false,
  showValidation=false
}) => {

  const handleOnChange = (event) => {
    let value = event.target.value
    let key = event.target.name
    let checkValid = valueList.includes(value)
    onChange(event, key, value, checkValid)
  }

  return (
    <Form.Select
      className={className}
      style={style}
      required={required}
      id={id}
      disabled={disabled}
      name={name}
      onChange={handleOnChange}
      isValid={showValidation && valid}
      isInvalid={showValidation && !valid}
    >
      <option value=''>Select an Option...</option>
      {valueList.map((optionValue, index) => {
        return (<option key={index} value={optionValue}>{optionsList[index]}</option>)
      })}
    </Form.Select>
  )
}



/**
 * Generic validation for text inputs. This function can handle both length requirements
 * and pattern requirements (or a combination of the two).
 * @param pattern - regex str: Required text input using regular expression.
 * @param input - str: Value passed from the component
 * @param minLength - int: The smallest amount of characters that need to be present.
 * @param required - boolean: Checks if the input is required to enforce length validation.
 * @returns {boolean}
 */
function patternValidation(pattern, input, minLength, required) {
  if (pattern === '.*') {
    if (required) {
      return input.length >= minLength;
    } else{
      return true;
    }
  } else {
    return new RegExp(pattern).test(input) && input.length >= minLength;
  }
}


/**
 * Creates a object with keys from the input object mapped to a boolean expression
 * of validation.
 * @param inputObj - object: Pass your data useState as the input object.
 * @returns {{}}
 */
export const customValidation = (inputObj) => {
  return Object.keys(inputObj).reduce((acc, key) => {
    acc[key] = inputObj[key] ? true : false;
    return acc;
  }, {})
}