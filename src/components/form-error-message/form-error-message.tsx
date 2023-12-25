import { FieldError, Merge, FieldErrorsImpl, FieldValues } from 'react-hook-form';
import './form-error-message.css';

type FormErrorMessageProps = {
    error: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
}

type Error = {
    message: string;
}

function FormErrorMessage({error}: FormErrorMessageProps): JSX.Element {
  const {message} = error as Error;

  return (
    <div className="error" role="alert">{message}</div>
  );
}

export default FormErrorMessage;
