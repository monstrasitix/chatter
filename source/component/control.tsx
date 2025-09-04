import { clsx } from "clsx";
import { InputHTMLAttributes } from "react";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register: UseFormRegisterReturn<string>;
}

export function Control({ label, register, ...rest }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[register.name];

  return (
    <div
      className={clsx("control", {
        "-error": !!error,
      })}
    >
      {label && (
        <label className="control-label" htmlFor={register.name}>
          {label}
        </label>
      )}

      {!!error?.message && (
        <div className="tooltip">{error.message as string}</div>
      )}

      <input {...rest} {...register} className="control-input" type="text" />
    </div>
  );
}
