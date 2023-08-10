import React from 'react';
import "../assets/App.css";
const Marker = (props) => {
    return (
      <div className='map_marker'>
        <svg width="31" height="41" viewBox="0 0 31 41" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M31 15.375C31 22.3738 21.5547 34.834 17.4133 39.975C16.4203 41.2002 14.5797 41.2002 13.5867 39.975C9.37266 34.834 0 22.3738 0 15.375C0 6.88352 6.93948 0 15.5 0C24.0573 0 31 6.88352 31 15.375Z" fill="url(#paint0_linear_3498_41890)"/>
          <path d="M8.01053 18.444C6.68252 18.8203 5.11847 17.6568 4.51825 15.848C3.9105 14.043 4.49888 12.2727 5.82689 11.8963C7.15086 11.52 8.71894 12.6835 9.32293 14.4924C9.92287 16.2973 9.33826 18.0677 8.01053 18.444Z" fill="white"/>
          <path d="M8.70209 9.67959C9.05819 11.8418 10.661 13.4201 12.2792 13.2012C13.8974 12.9823 14.9157 11.0544 14.5594 8.89239C14.1996 6.72646 12.6005 5.15194 10.9824 5.37086C9.36417 5.58979 8.34197 7.52141 8.70209 9.67959Z" fill="white"/>
          <path d="M25.1152 11.8361C26.443 12.2164 27.0276 13.9983 26.4276 15.8224C25.8237 17.6503 24.2556 18.8216 22.9316 18.4453C21.6036 18.0651 21.0152 16.2794 21.623 14.4552C22.2232 12.631 23.7872 11.4559 25.1152 11.8361Z" fill="white"/>
          <path d="M19.9653 5.07051C21.5835 5.28943 22.6095 7.24415 22.2494 9.4409C21.8933 11.6338 20.2905 13.2351 18.6721 13.0125C17.0539 12.7935 16.0317 10.835 16.388 8.64221C16.7479 6.44549 18.3469 4.84798 19.9653 5.07064" fill="white"/>
          <path d="M15.8105 13.8166C13.6153 13.7897 12.7015 15.4756 11.4898 17.1461C10.3362 18.736 9.5115 19.2353 8.77197 19.9226C8.10607 20.537 6.08526 22.7913 7.42484 24.7345C9.00045 27.0233 12.4346 25.011 15.2451 25.0455C18.2844 25.0801 21.6526 26.8544 22.965 25.0801C24.1613 23.4595 23.4721 21.4203 21.8461 20.0416C21.0486 19.3581 20.193 18.2022 19.6936 17.5761C18.652 16.2666 18.1605 13.8434 15.8107 13.8165" fill="white"/>
          <defs>
          <linearGradient id="paint0_linear_3498_41890" x1="0.249101" y1="40.8939" x2="38.837" y2="10.0269" gradientUnits="userSpaceOnUse">
          <stop stop-color="#332687"/>
          <stop offset="1" stop-color="#A40E84"/>
          </linearGradient>
          </defs>
        </svg>

        {props.showBallon && 
          <div className='maker-popup'>
            <div className='marker-name'>{props.content.details[0]}</div>
            <div className='marker-details'>{props.content.details[2]}</div>
            <div className='marker-details'>{props.content.details[1]}</div>
            <div className='marker-details'>{props.content.details[3]}</div>
            <div className='marker-details'>{props.content.details[4]}</div>
            <div className='marker-details'>{props.content.details[5]}</div>
          </div>
        }
      </div>
    );
  };

  export default Marker;