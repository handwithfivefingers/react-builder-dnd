// components/Topbar.js
// import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton } from "@mui/material";

import { Button, Switch, ThemeIcon } from "@mantine/core";
import lz from "lzutf8";
import copy from "copy-to-clipboard";
import { useEditor } from "@craftjs/core";
import { LuSave } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "@remix-run/react";

export const Topbar = ({ onSubmit }: any) => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const navigate = useNavigate();
  const handleCopy = () => {
    const json = query.serialize();
    onSubmit(lz.encodeBase64(lz.compress(json)));
  };
  return (
    <div className="flex items-center justify-between p-4 bg-indigo-300">
      <div className="flex justify-between px-4 w-full">
        <ThemeIcon variant="filled" color="black" onClick={() => navigate(-1)} className="cursor-pointer">
          <IoArrowBack />
        </ThemeIcon>
        <Button variant="filled" color="black" onClick={handleCopy} className="cursor-pointer">
          <ThemeIcon variant="filled" color="black" size={"md"}>
            <LuSave fontSize={16} />
          </ThemeIcon>
          <span>Save Document</span>
        </Button>
      </div>
    </div>
  );
};
