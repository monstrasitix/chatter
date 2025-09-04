import { useCallback } from "react";
import { FieldValues } from "react-hook-form";
import * as yup from "yup";

export function useYupValidationResolver<T extends FieldValues>(
  schema: yup.ObjectSchema<T>
) {
  return useCallback(
    async (data: T) => {
      try {
        const values = await schema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        if (errors instanceof yup.ValidationError) {
          return {
            values: {},
            errors: errors.inner.reduce(
              (allErrors, currentError: yup.ValidationError) => {
                if (currentError.path === undefined) {
                  return allErrors;
                }

                return {
                  ...allErrors,
                  [currentError.path]: {
                    type: currentError.type ?? "validation",
                    message: currentError.message,
                  },
                };
              },
              {}
            ),
          };
        }
      }
    },
    [schema]
  );
}
