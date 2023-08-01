import type { Meta } from "@storybook/react";

import { useEffect, useRef, useState } from "react";

import { storyIconMap } from "../../../tools/storybook.js";
import Button from "../Button/Button.js";
import NumberInput from "./NumberInput.js";

const metadata: Meta<typeof NumberInput> = {
  component: NumberInput,
};

export default metadata;

const Template = ({ iconAfter, iconBefore, width, ...args }) => {
  const IconBefore = storyIconMap[iconBefore];
  const IconAfter = storyIconMap[iconAfter];
  const [eventValue, setEventValue] = useState("");
  const [refValue, setRefValue] = useState("");
  const [parsedValue, setParsedValue] = useState("");
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    setRefValue(ref.current.value);
  }, [eventValue]);

  return (
    <div style={{ width }}>
      <NumberInput
        onChange={(event, value) => {
          setEventValue(event.target.value);
          setParsedValue(value);
        }}
        // formatOptions={{ maximumFractionDigits: 0 }}
        iconAfter={IconAfter ? <IconAfter /> : null}
        iconBefore={IconBefore ? <IconBefore /> : null}
        placeholder="Enter your text"
        ref={ref}
        {...args}
      />
      {
        <div style={{ fontSize: "0.875rem" }}>
          <p>
            Event Value: <strong>{eventValue}</strong>{" "}
            <em>({typeof eventValue})</em>
          </p>
          <div>
            <p>
              Ref Value: <strong>{refValue}</strong>{" "}
              <em>({typeof refValue})</em>
            </p>
            <button onClick={() => setRefValue(ref.current.value)}>
              Update
            </button>
          </div>
          <p>
            Parsed Value: <strong>{parsedValue}</strong>{" "}
            <em>({typeof parsedValue})</em>
          </p>
        </div>
      }
    </div>
  );
};

export const Basic = {
  args: {
    width: 240,
  },
  render: (args) => <Template {...args} />,
};

export const Formatted = {
  args: {
    format: true,
    parse: true,
    placeholder: "Enter your text",
    width: 240,
  },
  render: (args) => <Template {...args} />,
};

const PresetValueTemplate = (args) => {
  const [value, setValue] = useState(2000.01);
  return (
    <div>
      <Button onClick={() => setValue(value + 0.01)}>Update</Button>
      <Template value={value} {...args} />
    </div>
  );
};

export const PresetValue = {
  args: {
    format: true,
  },
  render: (args) => <PresetValueTemplate {...args} />,
};

const ManageStateWithPasedValueTemplate = (args) => {
  const [value, setValue] = useState();
  return (
    <div>
      <Template
        onChange={(event) => {
          setValue(event.target.value);
        }}
        value={value}
        {...args}
      />
    </div>
  );
};

export const StateManagedWithParsedValue = {
  args: {
    format: true,
    parse: true,
  },
  render: (args) => <ManageStateWithPasedValueTemplate {...args} />,
};
