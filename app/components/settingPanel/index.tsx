// components/SettingsPanel.js
// import { Box, Chip, Grid, Typography, Button as MaterialButton, FormControl, FormLabel, Slider } from "@mui/material";

import { useEditor } from "@craftjs/core";
import { Badge, Button, Text } from "@mantine/core";
import { createElement } from "react";

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });

  return (
    <div className="p-2 flex flex-col">
      <div className="flex gap-2 flex-col">
        <div className="flex gap-2 p-2 justify-between">
          <div>
            <Text>Selected</Text>
          </div>
          <div>
            <Badge size="small" color="blue.4" p={2} px={8} className="text-sm">
              {selected?.name}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 border rounded p-2">
          {selected?.settings && createElement(selected.settings)}
        </div>

        {selected?.isDeletable ? (
          <div className="flex gap-2 border rounded p-2">
            <Button
              variant="filled"
              onClick={() => {
                actions.delete(selected.id);
              }}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
