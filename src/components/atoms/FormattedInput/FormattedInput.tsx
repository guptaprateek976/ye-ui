import { uniqueId } from "lodash-es";
import {
  MutableRefObject,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { TextInputProps } from "../TextInput/TextInput.js";
import { TextInput } from "../TextInput/index.js";
import styles from "./formattedInput.module.css";

export interface FromattedInputProps extends TextInputProps {
  emptyValue?: null | number | string | undefined;
  format?: (string) => string;
  hiddenInputProps?: object;
  id?: string;
  isBusy?: boolean;
  isLoading?: boolean;
  onChangeValue?: (any) => any;
  parse?: (value: string, emptyValue: number | string) => number | string;
  value?: string;
}

function FormattedInput(
  {
    defaultValue,
    emptyValue,
    format,
    hiddenInputProps = {},
    id,
    isBusy,
    isLoading,
    onChange,
    onChangeValue,
    parse,
    value,
    ...props
  }: FromattedInputProps,
  ref: MutableRefObject<HTMLInputElement>,
) {
  const [parsedValue, setParsedValue] = useState<typeof defaultValue>(
    value || "",
  );
  const [formattedValue, setFormattedValue] = useState("");
  const [formattedInputID, formattedInputTextID] = useMemo(() => {
    const numberId = id || uniqueId("formattedInput_");
    return [numberId, "formattedInputText_" + numberId];
  }, [id]);

  const handleChange: typeof onChange = useCallback(
    (event) => {
      // to get new formatted text when input value is changed by user
      const formattedValue = format
        ? format(event.target.value)
        : event.target.value;
      setFormattedValue(formattedValue);
      onChange && onChange(event);
      // to update the value when input value is changed by user
      const newParsedValue = parse
        ? parse(formattedValue, emptyValue)
        : event.target.value;
      setParsedValue(newParsedValue);
      onChangeValue && onChangeValue(newParsedValue);
    },
    [emptyValue, format, onChange, onChangeValue, parse],
  );

  useEffect(() => {
    const newValue = value || defaultValue.toString();
    const newFormattedValue = format ? format(newValue) : newValue;
    setParsedValue(parse ? parse(newFormattedValue, emptyValue) : newValue);
    setFormattedValue(newFormattedValue);
  }, [emptyValue, format, parse, ref, value, defaultValue]);

  return (
    <div className={styles.root}>
      <TextInput
        id={formattedInputTextID}
        isBusy={isBusy}
        isLoading={isLoading}
        onChange={handleChange}
        value={formattedValue}
        {...props}
      />
      {/* This second input is required so that if any parent component tries
       * to access the value using ref, it always gets the unformatted text,
       * not the formatted string. The behavior is meant to be consistent with
       * the handleChange function.
       */}
      <input
        className={styles.numberInput}
        id={formattedInputID}
        readOnly
        ref={ref}
        value={parsedValue}
        {...hiddenInputProps}
      />
    </div>
  );
}

export default forwardRef(FormattedInput);
