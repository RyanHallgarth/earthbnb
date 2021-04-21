import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HotelIcon from "@material-ui/icons/Hotel";
import HouseIcon from "@material-ui/icons/House";
import BathtubIcon from "@material-ui/icons/Bathtub";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import StarIcon from "@material-ui/icons/Star";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Button } from "@material-ui/core";
import "../../Location.css";
import Map from "../Map";

const Location = ({ location, match, getLocation }) => {
  useEffect(() => {
    getLocation(match.params.id);
  }, []);

  const {
    name,
    description,
    picture_url,
    street,
    neighbourhood,
    room_type,
    accommodates,
    bathrooms,
    bedrooms,
    beds,
    has_availabilitruey,
    review_scores_rating,
    hostrue_is_superhostrue,
    host_name,
    property_type,
    instrueantrue_bookable,
    notes,
    latitude,
    longitude,
    price,
    weekly_price,
  } = location;

  return (
    <div className='card'>
      <Button
        to={`/search`}
        component={Link}
        variant='outlined'
        className='more-btn'
      >
        Back to Search
      </Button>
      <div className='card grid-1'>
        <div className='title'>
          <h1>{name}</h1>
        </div>

        <div className='flex-container '>
          <div className='icon-text'>
            Availability:
            {has_availabilitruey ? (
              <CheckCircleOutlineIcon
                className='icon'
                style={{ color: "green", fontSize: "20px" }}
              />
            ) : (
              <HighlightOffIcon
                className='icon'
                style={{ color: "red", fontSize: "20px" }}
              />
            )}
          </div>
          <div className='icon-text'>
            Superhost:
            {hostrue_is_superhostrue ? (
              <CheckCircleOutlineIcon
                className='icon'
                style={{ color: "green", fontSize: "20px" }}
              />
            ) : (
              <HighlightOffIcon
                className='icon'
                style={{ color: "red", fontSize: "20px" }}
              />
            )}
          </div>
          <div className='icon-text'>
            Instant Booking:
            {instrueantrue_bookable ? (
              <CheckCircleOutlineIcon
                className='icon'
                style={{ color: "green", fontSize: "20px" }}
              />
            ) : (
              <HighlightOffIcon
                className='icon'
                style={{ color: "red", fontSize: "20px" }}
              />
            )}
          </div>
        </div>
      </div>
      <div className='card grid-2'>
        <img src={picture_url} alt='' />

        <Map lat={latitude} lng={longitude} />
      </div>
      <div style={{ textAlign: "center" }}>
        <h2>
          {property_type} hosted by {host_name}
        </h2>
        <h4 className='address'>in the {neighbourhood} neighborhood</h4>
        <h4 className='address'>{street}</h4>
      </div>
      <div className='card grid-2'>
        <div className='top-deets'>
          <div className='icon-list'>
            <ul>
              <li className='flex-container'>
                <span>
                  <HouseIcon
                    style={{
                      marginRight: "15px",
                      fontSize: "30px",
                      color: "#474747",
                    }}
                  />
                </span>
                {room_type}
              </li>
              <p className='note'>You'll have the {room_type} to yourself</p>
              <li className='flex-container'>
                <span>
                  <AttachMoneyIcon
                    style={{
                      marginRight: "15px",
                      fontSize: "30px",
                      color: "#474747",
                    }}
                  />
                </span>
                Costs ${price} per night
              </li>
              <p className='note'>Or a weekly price of ${weekly_price}</p>
              <li className='flex-container'>
                {" "}
                <span>
                  <PeopleAltIcon
                    style={{
                      marginRight: "15px",
                      fontSize: "30px",
                      color: "#474747",
                    }}
                  />
                </span>
                Accommodates {accommodates}
              </li>
              <p className='note'>
                Enjoy up to {accommodates - 1} guest(s) during your stay
              </p>
            </ul>
          </div>
        </div>
        <div className='mb'>
          <div className='top-deets'>
            <ul>
              <li className='flex-container'>
                {" "}
                <span>
                  <MeetingRoomIcon
                    style={{
                      marginRight: "15px",
                      fontSize: "30px",
                      color: "#474747",
                    }}
                  />
                </span>
                {bedrooms} Bedroom(s)
              </li>
              <li className='flex-container'>
                {" "}
                <span>
                  <HotelIcon
                    style={{
                      marginRight: "15px",
                      fontSize: "30px",
                      color: "#474747",
                    }}
                  />
                </span>
                {beds} Bed(s)
              </li>
              <li className='flex-container'>
                {" "}
                <span>
                  <BathtubIcon
                    style={{
                      marginRight: "15px",
                      fontSize: "30px",
                      color: "#474747",
                    }}
                  />
                </span>
                {bathrooms} Bathroom(s)
              </li>
              <li className='flex-container'>
                {" "}
                <span>
                  <StarIcon
                    style={{
                      marginRight: "15px",
                      fontSize: "30px",
                      color: "#474747",
                    }}
                  />
                </span>
                {review_scores_rating} out of 100
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='grid-1 card'>
        <h2>Detailed Description</h2>
        <p>{description}</p>
      </div>
      <div className='grid-1 card'>
        <h2>Notes</h2>
        <p>{notes}</p>
      </div>
    </div>
  );
};

export default Location;
