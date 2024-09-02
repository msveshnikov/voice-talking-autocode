import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

const LanguageSelector = ({ language, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
                labelId="language-select-label"
                id="language-select"
                value={language}
                label="Language"
                onChange={onChange}
                startAdornment={<LanguageIcon sx={{ mr: 1 }} />}
            >
                <MenuItem value="en-US">English</MenuItem>
                <MenuItem value="ru-RU">Russian</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSelector;
