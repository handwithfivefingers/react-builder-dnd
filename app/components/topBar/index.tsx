// components/Topbar.js
// import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton } from "@mui/material";

import { Button, Switch } from "@mantine/core";
import lz from "lzutf8";
import copy from "copy-to-clipboard";
import { useEditor } from "@craftjs/core";

export const Topbar = ({ onSubmit }: any) => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const handleCopy = () => {
    const json = query.serialize();
    // copy(lz.encodeBase64(lz.compress(json)));
    onSubmit(lz.encodeBase64(lz.compress(json)))
    // alert("Copied");
  };
  return (
    <div className="flex items-center justify-between p-4 bg-indigo-300">
      <div className="grid grid-cols-8">
        <div>
          <Switch label="Enable" checked={true} />
        </div>
        <div>
          <Button variant="filled" onClick={handleCopy}>
            Copy JSON
          </Button>
        </div>
      </div>
    </div>
  );
};
