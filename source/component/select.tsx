import { clsx } from "clsx";
import { SelectHTMLAttributes } from "react";
import { useFormContext, UseFormRegisterReturn } from "react-hook-form";

export interface Option {
  value: string;
  label: string;
  default?: boolean;
}

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  register: UseFormRegisterReturn<string>;
  options: Option[];
}

export function Select({ label, register, options, ...rest }: Props) {
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

      <select {...rest} {...register} className="control-input">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
