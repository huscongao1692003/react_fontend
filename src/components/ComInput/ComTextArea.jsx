import { useForm, useFormContext } from "react-hook-form";
import { v4 } from "uuid";
import { FieldError } from "../FieldError/FieldError";
import { Input } from 'antd';

const { TextArea } = Input;

const ComTextArea = (
  (
    {
      label,
      required,
      className,
      onChangeValue,
      onChange,
      maxLength,
      search,
      minValue,
      maxValue,
      subLabel,
      decimalLength,
      ...props
    },
    ref
  ) => {
    const { watch, formState: { errors }, setValue } = useFormContext();
    const valueWatch = watch(props.name);
    const error = errors[props.name];
    const inputId = v4();

    const onlyChangeWithCondition = (e) => {
      let value = '';
      value =
        e.clipboardData?.getData('text') ??
        e.target.value;
      setValue(props.name, value);
      onChangeValue?.(props.name, value);
    };

    return (
      <>
        <div className={`${className}`}>
          {label && (
            <div className="mb-2 flex justify-between">
              <label htmlFor={inputId} className="text-paragraph font-bold">
                {label}
                {required && (
                  <span className="text-paragraph font-bold text-error-7 text-red-500">
                    *
                  </span>
                )}
              </label>
              {subLabel && <span className="ml-8">{subLabel}</span>}
            </div>
          )}

          <TextArea rows={4}
           id={inputId}
            showCount
            size="large"
            {...props}
            value={props.value ?? valueWatch}
            status={error && 'error'}
            onChange={onlyChangeWithCondition}
            maxLength={maxLength}

          />
          {error && <FieldError className="text-red-500">{error.message?.toString()}</FieldError>}
        </div>
      </>
    );
  }
);

export default ComTextArea;
