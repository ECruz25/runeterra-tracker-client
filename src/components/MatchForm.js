import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import React from 'react';

export default ({ onChange }) => {
  return (
    <form>
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
            onChange={({ target: { name, value } }) => {
              onChange(name, value);
            }}
            name="win"
            color="primary"
          />
        }
        label="Primary"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Save Match
      </Button>
    </form>
  )
}