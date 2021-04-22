import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../Search.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={value}>
      {children}
    </Tooltip>
  );
}

const AirbnbSlider = withStyles({
  root: {
    color: "#3e930a",
    height: 3,
    width: 300,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#000",
    },
  },
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className='bar' />
      <span className='bar' />
      <span className='bar' />
    </span>
  );
}

const Search = ({ filterSearch }) => {
  const classes = useStyles();
  const history = useHistory();
  const [minGuests, setMinGuests] = useState(1);
  const [minBaths, setMinBaths] = useState(1);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [minBeds, setMinBeds] = useState(1);
  const [priceRange, setPriceRange] = useState([100, 400]);

  const onChangePrice = (event, newValue) => {
    setPriceRange(newValue);
  };

  const onChangeGuest = (e) => {
    setMinGuests(e.target.value);
  };
  const onChangeBath = (e) => {
    setMinBaths(e.target.value);
  };
  const onChangeBedroom = (e) => {
    setMinBedrooms(e.target.value);
  };
  const onChangeBed = (e) => {
    setMinBeds(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    filterSearch(minGuests, minBaths, minBedrooms, minBeds, priceRange);
    history.push("/search", { from: "Home" });
  };
  return (
    <div className='search'>
      <div className='parameters'>
        <div className='form-items'>
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
        </div>
        <div className='form-items'>
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
          </FormControl>
        </div>
        <div className='form-items'>
          <FormControl className={classes.formControl} onSubmit={onSubmit}>
            <InputLabel htmlFor='min-bedrooms' id='min-bedrooms'>
              Min. Bedrooms
            </InputLabel>
            <Select
              labelId='min-bedrooms'
              id='min-bedrooms'
              value={minBedrooms}
              onChange={onChangeBedroom}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
            </Select>
            <FormHelperText>Min. # of Bedrooms</FormHelperText>
          </FormControl>
        </div>
        <div className='form-items'>
          <FormControl className={classes.formControl} onSubmit={onSubmit}>
            <InputLabel htmlFor='min-beds' id='min-beds'>
              Min. Beds
            </InputLabel>
            <Select
              labelId='min-beds'
              id='min-beds'
              value={minBeds}
              onChange={onChangeBed}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
            </Select>
            <FormHelperText>Min. # of Beds</FormHelperText>
          </FormControl>
        </div>
        <div className='form-items'>
          <div className='card' style={{ width: "100%" }}>
            <FormControl>
              <AirbnbSlider
                ValueLabelComponent={ValueLabelComponent}
                ThumbComponent={AirbnbThumbComponent}
                max={1000}
                valueLabelDisplay='on'
                getAriaLabel={(index) =>
                  index === 0 ? "Minimum price" : "Maximum price"
                }
                value={priceRange}
                onChange={onChangePrice}
              />
              <FormHelperText>Select desired price range</FormHelperText>
            </FormControl>
          </div>
          <Button type='submit' variant='outlined' onClick={onSubmit}>
            Search Locations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
