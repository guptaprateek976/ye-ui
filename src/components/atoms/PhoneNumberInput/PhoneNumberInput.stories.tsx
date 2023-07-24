import { Meta } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

import { NanValue } from "../../../tools/number.js";
import { FromattedInputProps } from "../FormattedInput/FormattedInput.js";
import PhoneNumberInput from "./PhoneNumberInput.js";

const Template = ({
  iconAfter,
  iconBefore,
  width,
  ...args
}: FromattedInputProps) => {
  const [eventValue, setEventValue] = useState<string>();
  const [refValue, setRefValue] = useState<string>();
  const [parsedValue, setParsedValue] = useState<NanValue>("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRefValue(ref.current?.value);
  }, [eventValue]);
  return (
    <div style={{ width }}>
      <PhoneNumberInput
        onChange={(event) => {
          setEventValue(event.target.value);
        }}
        onChangeValue={(value) => {
          setParsedValue(value);
        }}
        ref={ref}
        {...args}
      />
      {eventValue !== undefined && (
        <div style={{ fontSize: "0.875rem" }}>
          <p>
            Event Value: <strong>{eventValue}</strong>{" "}
            <em>({typeof eventValue})</em>
          </p>
          <p>
            Ref Value: <strong>{refValue}</strong> <em>({typeof refValue})</em>
          </p>
          <p>
            Parsed Value: <strong>{parsedValue}</strong>{" "}
            <em>({typeof parsedValue})</em>
          </p>
        </div>
      )}
    </div>
  );
};

const metadata: Meta<typeof PhoneNumberInput> = {
  component: PhoneNumberInput,
  render: (args) => <Template {...args} />,
};

export default metadata;

export const Basic = {
  args: {
    width: 240,
  },
};
