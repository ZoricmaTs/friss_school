import './style.scss';
import {Field} from 'formik';

export interface InputProps {
  type: 'text' | 'password' | 'email' | 'textarea' | 'number';
  name: string;
  label: string;
  errors: {[key: string]: string | undefined};
  touched: {[key: string]: boolean | undefined};
}

export function Input(props: InputProps) {
  return <div style={{width: '100%'}}>
    <p className={'input__label'}>{props.label}</p>
    <Field
      name={props.name}
      as={props.type === 'textarea' ? props.type : undefined}
      type={props.type === 'textarea' ? undefined : props.type}
      className={`input ${props.errors[props.name] && props.touched[props.name] ? 'error' : ''}`}
    />
    {props.errors[props.name] && props.touched[props.name] ? <small className={'error'}>{props.errors[props.name]}</small> : null}
  </div>
}