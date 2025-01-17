import { Preview } from "@storybook/react";

import "../src/styles/base.css";
import "../src/styles/media.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    // for addon-actions to work with regex with TS
    // add argTypes explicitly for components which extend
    // the change handlers from a different type till this issue is resolved
    // https://github.com/storybookjs/storybook/issues/15012
    // actions: { argTypesRegex: "^on.*" },
  },
};

export default preview;
