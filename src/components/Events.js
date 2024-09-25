import { LocationOn } from '@mui/icons-material';
import EventIcon from '@mui/icons-material/Event';
import React, { useEffect, useState } from 'react';

function Events() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/events`)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        filterEvents(data); 
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const filterEvents = (events) => {
    const today = new Date().toISOString().split('T')[0];
    const upcoming = events.filter(event => event.date >= today);
    const past = events.filter(event => event.date < today);
    setUpcomingEvents(upcoming);
    setPastEvents(past);
    setLoading(false);
  };

  return (
    <div className='mt-10 font-montserrat'>
      <h2 className='w-full lg:w-3/4 mx-5 lg:mx-auto font-bold text-lg lg:text-2xl'>Upcoming Events</h2>
      {!loading && upcomingEvents.length > 0 ? (
        <ul>
          {upcomingEvents.map((event) => (
            <div className='shadow-lg bg-white hover:bg-gray-200 border-4 border-l-green-500 hover:border-l-green-900 p-2 my-4 mx-5 lg:mx-auto lg:w-3/4' key={event._id}>
                <div className='block lg:flex gap-4'>
                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${event.poster}`} className='w-28 h-28 object-cover' />
                    <div>
                        <button className='text-purple-900 font-bold uppercase hover:underline mt-2'>{event.title}</button>
                        <div className='mt-2 text-gray-600'>{event.description}</div>
                        <div className='mt-1 text-gray-900 flex items-center gap-2'>
                            <LocationOn sx={{fontSize:16}} />
                            <span>{event.venue}</span>
                        </div>
                        <div className='mt-1 text-gray-900 flex items-center gap-2'>
                            <EventIcon sx={{fontSize:16}} />
                            <span>{event.date}</span>
                        </div>
                    </div>
                </div>
            </div>
          ))}
        </ul>
      ) : (
        <p className='w-3/4 mx-auto text-sm mt-5 mb-10'>No upcoming events.</p>
      )}
    {
        loading && <div className='w-3/4 mx-auto text-sm mt-5 mb-10'>Loading ... </div>
    }

    <h2 className='w-3/4 mx-5 lg:mx-auto font-bold text-lg lg:text-2xl mt-10'>Past Events</h2>
      { !loading && pastEvents.length > 0 ? (
        <ul>
          {!loading && pastEvents.map((event) => (
            <div className='shadow-lg bg-white hover:bg-gray-200 border-4 border-l-green-500 hover:border-l-green-900 p-2 my-4 mx-5 lg:mx-auto lg:w-3/4' key={event._id}>
                <div className='block lg:flex gap-4'>
                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${event.poster}`} className='w-28 h-28 object-cover' />
                    <div>
                        <button className='text-purple-900 font-bold uppercase hover:underline mt-2'>{event.title}</button>
                        <div className='mt-2 text-gray-600'>{event.description}</div>
                        <div className='mt-1 font-bold'>{event.venue}</div>
                        <div className='mt-1'>{event.date}</div>
                    </div>
                </div>
            </div>
          ))}
        </ul>
      ) : (
        <p className='w-3/4 mx-auto text-sm mt-5 mb-10'>No past events.</p>
      )}
    {
        loading && <div className='w-3/4 mx-auto text-sm mt-5 mb-10'>Loading ... </div>
    }

    </div>
  );
}

export default Events;
