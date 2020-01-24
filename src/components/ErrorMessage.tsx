import * as React from 'react';

interface IErrorMessageProps {
  error: string;
}

export function ErrorMessage(props: IErrorMessageProps): JSX.Element {
  return (
    <div className="error">
        {props.error}
    </div>
  );
}
