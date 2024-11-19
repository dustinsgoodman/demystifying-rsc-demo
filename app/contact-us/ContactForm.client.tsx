"use client";

import { useActionState } from "react";
import cn from "classnames";
import { ContactFormState } from "./types";

const initialState = {
  success: false,
  error: undefined,
  fields: {
    name: "",
    email: "",
    phone: "",
    message: "",
  },
};

export function ContactForm({
  handleSubmit,
}: {
  handleSubmit: (
    prevState: ContactFormState,
    data: FormData
  ) => Promise<ContactFormState>;
}) {
  const [state, formAction] = useActionState(handleSubmit, initialState);

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.error?.formErrors &&
        state.error.formErrors.map((err) => (
          <p className="text-red-500" key={err}>
            {err}
          </p>
        ))}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={cn(
            "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            {
              "border-red-500": state.error?.fieldErrors.name,
            }
          )}
          defaultValue={state.fields.name}
        />
        <FieldErrorsMessage errors={state.error?.fieldErrors.name} />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={cn(
            "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            {
              "border-red-500": state.error?.fieldErrors.email,
            }
          )}
          defaultValue={state.fields.email}
        />
        <FieldErrorsMessage errors={state.error?.fieldErrors.email} />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className={cn(
            "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            {
              "border-red-500": state.error?.fieldErrors.phone,
            }
          )}
          defaultValue={state.fields.phone}
        />
        <FieldErrorsMessage errors={state.error?.fieldErrors.phone} />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={cn(
            "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            {
              "border-red-500": state.error?.fieldErrors.message,
            }
          )}
          defaultValue={state.fields.message}
        />
        <FieldErrorsMessage errors={state.error?.fieldErrors.message} />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}

function FieldErrorsMessage({ errors = [] }: { errors?: string[] }) {
  if (!errors.length) return null;

  return (
    <>
      {errors.map((err) => (
        <p className="text-red-500" key={err}>
          {err}
        </p>
      ))}
    </>
  );
}
