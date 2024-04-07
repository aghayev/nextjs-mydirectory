import React from 'react'
import { useFormState, useFormStatus } from "react-dom";
import { submitForm } from "../../lib/actions";

function Submit() {
    const status = useFormStatus();
    return <button disabled={status.pending}>{status.pending ? "Submitting..." : "Submit"}</button>
}

function Form() {
  const [message, formAction] = useFormState(submitForm, 'Initial message');

    return (
      <form action={formAction}>
        <Submit />
        {message}
      </form>
    )
}

const LoginPage = () => {
  return (
    <div>
      <h1>My Login Page</h1>
      <Form />
    </div>
  )
}

export default LoginPage
