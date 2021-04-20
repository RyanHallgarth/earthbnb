import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HotelIcon from "@material-ui/icons/Hotel";
import HouseIcon from "@material-ui/icons/House";
import BathtubIcon from "@material-ui/icons/Bathtub";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import BookIcon from "@material-ui/icons/Book";
import "../../Location.css";

const Location = ({ location, match, getLocation }) => {
  useEffect(() => {
    getLocation(match.params.id);
  }, []);

  const {
    name,
    description,
    picture_url,
    street,
    neighborhood,
    room_type,
    accommodates,
    bathrooms,
    bedrooms,
    beds,
    amenities,
    guests_included,
    has_availabilitruey,
    review_scores_rating,
    number_of_reviews,
    cancellation_policy,
    hostrue_is_superhostrue,
    host_name,
    property_type,
    instrueantrue_bookable,
    notes,
  } = location;

  return (
    <div>
      <Link to='/search' className='btn btn-light'>
        Back to Search
      </Link>
      <div className='title'>
        <h1>{name}</h1>
      </div>

      <div className='flex-container'>
        <div className='icon-text'>
          Availability:{" "}
          {has_availabilitruey ? (
            <CheckCircleOutlineIcon
              className='icon'
              style={{ color: "green", fontSize: "20px" }}
            />
          ) : (
            <HighlightOffIcon className='icon' style={{ color: "red" }} />
          )}
        </div>
        <div className='icon-text'>
          Superhost:{" "}
          {hostrue_is_superhostrue ? (
            <CheckCircleOutlineIcon
              className='icon'
              style={{ color: "green", fontSize: "20px" }}
            />
          ) : (
            <HighlightOffIcon className='icon' style={{ color: "red" }} />
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
            <HighlightOffIcon className='icon' style={{ color: "red" }} />
          )}
        </div>
      </div>
      <div className='card grid-2'>
        <div className='all-center'>
          <img src={picture_url} alt='' />
        </div>
        <div className='top-deets all-center'>
          <h2>
            {property_type} hosted by {host_name}
          </h2>
          <h4 class='address'>{street}</h4>

          <div className='icon-list'>
            <ul>
              <li class='flex-container'>
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
              <p class='note'>You'll have the {room_type} to yourself</p>
              <li class='flex-container'>
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
              <p class='note'>
                Enjoy up to {accommodates - 1} guest(s) during your stay
              </p>

              <li class='flex-container'>
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
              <li class='flex-container'>
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
              <li class='flex-container'>
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
            </ul>
          </div>
        </div>
      </div>

      <div className='card grid-1 description'>
        <h2>Notes</h2>

        {notes}
      </div>
    </div>
  );
};

export default Location;
