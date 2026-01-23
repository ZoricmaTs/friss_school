import './style.scss';
import {Field} from 'formik';
import React, {type ChangeEvent} from 'react';

export interface InputProps {
  type: 'text' | 'password' | 'email' | 'textarea' | 'number';
  name: string;
  label: string;
  errors: {[key: string]: string | undefined};
  touched: {[key: string]: boolean | undefined};
  value?: string | number;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export function Input(props: InputProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement> ) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  const additionalProps: {value?: string | number, onChange?: typeof onChange} = {};

  if (props.value) {
    additionalProps.value = props.value;
    additionalProps.onChange = onChange;
  }

  const error: boolean = Boolean(props.errors[props.name] && props.touched[props.name]);
  const inputClassName = `input ${error ? 'error' : ''}`;

  return <div style={props.style ?? props.style} className={'input__wrapper'}>
    <p className={'input__label'}>{props.label}</p>
    <Field
      {...additionalProps}
      name={props.name}
      as={props.type === 'textarea' ? props.type : undefined}
      type={props.type === 'textarea' ? undefined : props.type}
      className={inputClassName}
      style={props.type === 'textarea' ? {height: '200px'} : {}}
    />
    {error ? <small className={'error'}>{props.errors[props.name]}</small> : null}
  </div>
}