import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../Search.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Search = ({ filterSearch }) => {
  const classes = useStyles();
  const history = useHistory();
  const [minGuests, setMinGuests] = useState(1);
  const [minBaths, setMinBaths] = useState(1);

  const onChangeGuest = (e) => {
    setMinGuests(e.target.value);
  };
  const onChangeBath = (e) => {
    setMinBaths(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    filterSearch(minGuests, minBaths);
    history.push("/search", { from: "Home" });
  };
  return (
    <div className='search'>
      {/* <form onSubmit={onSubmit} className='form' id='search'>
        <select value={minGuests} onChange={onChangeGuest}>
          <option selected value='1'>
            1
          </option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <select value={minBaths} onChange={onChangeBath}>
          <option selected value='1'>
            1
          </option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <input type='submit' value='Search' />
      </form> */}

      <FormControl className={classes.formControl} onSubmit={onSubmit}>
        <InputLabel htmlFor='min_guests' id='min-guests'>
          Min. Guests
        </InputLabel>
        <Select
          labelId='min-guests'
          id='min-guests'
          value={minGuests}
          onChange={onChangeGuest}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={6}>Six</MenuItem>
          <MenuItem value={7}>Seven</MenuItem>
          <MenuItem value={8}>Eight</MenuItem>
          <MenuItem value={9}>Nine</MenuItem>
        </Select>
        <FormHelperText>Min. # of Guests</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl} onSubmit={onSubmit}>
        <InputLabel htmlFor='min-bathrooms' id='min-bathrooms'>
          Min. Bathrooms
        </InputLabel>
        <Select
          labelId='min-bathrooms'
          id='min-bathrooms'
          value={minBaths}
          onChange={onChangeBath}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
        </Select>
        <FormHelperText>Min. # of Bathrooms</FormHelperText>
        <Button type='submit' variant='contained' onClick={onSubmit}>
          Submitty
        </Button>
      </FormControl>
    </div>
  );
};

export default Search;
