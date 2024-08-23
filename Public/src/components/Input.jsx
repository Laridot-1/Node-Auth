import { Visibility, VisibilityOff } from "@mui/icons-material"
import { colors, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"

const Input = ({
  icon: Icon,
  placeholder,
  type,
  value,
  handleChange,
  handleKeyDown,
  inputRef,
  index,
  size,
  verify,
  name,
}) => {
  const [show, setShow] = useState(false)
  const inputType = type === "text" ? "name" : type

  return (
    <TextField
      size={size}
      name={name || inputType}
      value={value}
      onChange={(e) => handleChange(e, index)}
      onKeyDown={verify ? (e) => handleKeyDown(e, index) : null}
      inputRef={inputRef}
      type={type === "password" && show ? "text" : type}
      placeholder={placeholder}
      InputProps={{
        startAdornment: Icon && (
          <InputAdornment position="start">{Icon}</InputAdornment>
        ),
        endAdornment: type === "password" && (
          <InputAdornment position="end">
            <IconButton onClick={() => setShow(!show)}>
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputProps={{
        maxLength: verify && 1,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&:hover fieldset": {
            borderColor: colors.green[400],
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.green[700],
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px ${colors.green[200]} inset`,
            WebkitTextFillColor: "black",
          },
          "& fieldset": {
            borderColor: colors.grey[600],
          },
          color: colors.grey[100],
        },
        "& .MuiInputBase-input": verify && {
          textAlign: "center",
          fontSize: "24px",
          py: "0.65rem",
        },
      }}
    />
  )
}

export default Input
