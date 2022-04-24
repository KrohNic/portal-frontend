import type { AnySchema } from 'yup';
import Lazy from 'yup/lib/Lazy';

interface IValidateError<T> {
  inner: Array<{
    path: keyof T;
    message: string;
  }>;
}

export const validate = <T extends {}>(
  schema: AnySchema | Lazy<AnySchema>,
  target: T,
) => {
  try {
    schema.validateSync(target, { abortEarly: false });
  } catch (validateError) {
    const errors: Partial<Record<keyof T, string>> = {};

    (validateError as IValidateError<T>).inner.forEach((errorInner) => {
      errors[errorInner.path] = errorInner.message;
    });

    return errors;
  }

  return null;
};
