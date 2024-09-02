import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSelector = ({ language, onChange }) => {
  const languages = [
    { code: "en-US", name: "English" },
    { code: "ru-RU", name: "Russian" },
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <LanguageIcon sx={{ mr: 1 }} />
      <FormControl fullWidth size="small">
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          label="Language"
          onChange={onChange}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              <Typography>{lang.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;