import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React from 'react';

export default ({ onChange, onSubmit }) => {
  return (
    <form noValidate onSubmit={onSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="deckid"
        label="Deck Id"
        name="deckId"
        autoFocus
        onChange={({ target: { name, value } }) => {
          onChange(name, value);
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={({ target: { name, checked } }) => {
              onChange(name, checked);
            }}
            name="win"
            color="primary"
          />
        }
        label="Win"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Create Match
      </Button>
    </form>
  )
}