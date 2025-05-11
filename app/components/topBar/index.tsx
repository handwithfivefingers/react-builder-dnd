// components/Topbar.js
// import { Box, FormControlLabel, Switch, Grid, Button as MaterialButton } from "@mui/material";

import { useEditor } from "@craftjs/core";
import { Button, ThemeIcon } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import lz from "lzutf8";
import { IoArrowBack } from "react-icons/io5";
import { LuSave } from "react-icons/lu";

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
