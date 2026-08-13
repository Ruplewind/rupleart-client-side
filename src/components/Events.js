import { LocationOn } from '@mui/icons-material';
import EventIcon from '@mui/icons-material/Event';
import CampaignIcon from '@mui/icons-material/Campaign';
import React, { useEffect, useState } from 'react';

function Events() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [lightboxEvent, setLightboxEvent] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxEvent(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const SkeletonGrid = () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full lg:w-3/4 mx-5 lg:mx-auto mt-5 mb-10'>
      {[1, 2, 3].map((i) => (
        <div key={i} className='rounded-xl overflow-hidden border border-gray-100 shadow-sm animate-pulse'>
          <div className='h-44 w-full bg-gray-200'></div>
          <div className='p-4'>
            <div className='h-3 w-2/3 bg-gray-200 rounded mb-3'></div>
            <div className='h-2 w-full bg-gray-100 rounded mb-2'></div>
            <div className='h-2 w-5/6 bg-gray-100 rounded mb-4'></div>
            <div className='h-2 w-1/2 bg-gray-100 rounded'></div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = ({ label }) => (
    <div className='w-full lg:w-3/4 mx-5 lg:mx-auto mt-5 mb-10 border border-dashed border-gray-300 rounded-xl py-10 text-center'>
      <EventIcon sx={{ fontSize: 28 }} className='text-gray-300' />
      <p className='text-sm text-gray-500 mt-2'>{label}</p>
    </div>
  );

  const EventCard = ({ event, isPast, onImageClick }) => (
    <div className={`group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-200 ${isPast ? 'opacity-90' : ''}`}>
      <div
        className='relative h-44 w-full overflow-hidden bg-gray-100 cursor-zoom-in'
        onClick={() => onImageClick(event)}
        role="button"
        tabIndex={0}
        aria-label={`View full image for ${event.title}`}
        onKeyDown={(e) => { if (e.key === 'Enter') onImageClick(event); }}
      >
        {/* Blurred backdrop fills the frame */}
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${event.poster}`}
          className={`absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-70 ${isPast ? 'grayscale-[15%]' : ''}`}
          alt=""
          aria-hidden="true"
        />
        <span className='absolute inset-0 bg-black/10'></span>
        {/* Full, uncropped poster on top */}
        <img
          src={`${process.env.REACT_APP_API_URL}/uploads/${event.poster}`}
          className={`relative w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ${isPast ? 'grayscale-[15%]' : ''}`}
          alt={event.title}
        />
        <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full text-white ${isPast ? 'bg-gray-700' : 'bg-purple-900'}`}>
          {isPast ? 'Past' : 'Upcoming'}
        </span>
        <span className='absolute bottom-3 right-3 bg-black/70 text-white text-[11px] px-2 py-1 rounded-md flex items-center gap-1'>
          <EventIcon sx={{ fontSize: 12 }} />
          {event.date}
        </span>
        <span className='absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors'>
          <span className='opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 text-purple-900 text-xs font-semibold px-3'>
            View
          </span>
        </span>
      </div>
      <div className='p-4'>
        <button className='text-purple-900 font-bold uppercase text-sm hover:text-purple-700 transition-colors text-left leading-snug'>
          {event.title}
        </button>
        <div className='mt-2 text-gray-600 text-xs leading-relaxed line-clamp-3'>
          {event.description}
        </div>
        <div className='mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-gray-500 text-xs'>
          <LocationOn sx={{ fontSize: 14 }} className='text-[#b8925a]' />
          <span>{event.venue}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className='mt-2 font-montserrat pb-4'>

      {/* Intro */}
      <div className='max-w-2xl mx-auto text-center mt-8 mb-10 px-4'>
        <span className='text-[#b8925a] text-[11px] tracking-[0.3em] uppercase font-semibold'>
          Rupleart Events
        </span>
        <h1 className='font-serif italic text-purple-950 text-2xl lg:text-3xl mt-3 mb-4'>
          Discover. Experience. Promote.
        </h1>
        <p className='text-sm text-gray-600 leading-relaxed'>
          Explore events, exhibitions, promotions, special offers and experiences featured on Rupleart.
        </p>
      </div>

      {/* Advertise callout */}
      <div className='w-full lg:w-3/4 mx-5 lg:mx-auto mb-12'>
        <div className='bg-[#faf8f5] border-l-4 border-[#d4b078] rounded-r-lg p-5 flex gap-4 items-start'>
          <span className='flex items-center justify-center w-9 h-9 rounded-full bg-purple-900 text-white shrink-0'>
            <CampaignIcon sx={{ fontSize: 18 }} />
          </span>
          <div>
            <div className='font-serif italic text-purple-950 text-base mb-1'>Want to Advertise?</div>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Have an event or promotion you'd like featured on Rupleart? <i className='text-purple-800'>Anyone can request to advertise.</i> Contact the <i className='text-purple-800'>Rupleart Administration through our official administration email</i> with the details of your event or promotion. Advertisements are reviewed and approved before publication.
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className='w-full lg:w-3/4 mx-5 lg:mx-auto flex items-center gap-3'>
        <h2 className='font-bold text-lg whitespace-nowrap text-purple-950'>Upcoming Events</h2>
        <span className='h-px flex-1 bg-gray-200'></span>
      </div>

      {loading && <SkeletonGrid />}

      {!loading && upcomingEvents.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full lg:w-3/4 mx-5 lg:mx-auto mt-5 mb-10'>
          {upcomingEvents.map((event) => (
            <EventCard event={event} isPast={false} onImageClick={setLightboxEvent} key={event._id} />
          ))}
        </div>
      )}

      {!loading && upcomingEvents.length === 0 && (
        <EmptyState label="No upcoming events." />
      )}

      {/* Past Events */}
      <div className='w-full lg:w-3/4 mx-5 lg:mx-auto flex items-center gap-3 mt-4'>
        <h2 className='font-bold text-lg whitespace-nowrap text-purple-950'>Past Events</h2>
        <span className='h-px flex-1 bg-gray-200'></span>
      </div>

      {loading && <SkeletonGrid />}

      {!loading && pastEvents.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full lg:w-3/4 mx-5 lg:mx-auto mt-5 mb-10'>
          {pastEvents.map((event) => (
            <EventCard event={event} isPast={true} onImageClick={setLightboxEvent} key={event._id} />
          ))}
        </div>
      )}

      {!loading && pastEvents.length === 0 && (
        <EmptyState label="No past events." />
      )}

      {/* Lightbox */}
      {lightboxEvent && (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'
          onClick={() => setLightboxEvent(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className='absolute top-4 right-4 text-white/80 hover:text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors'
            onClick={() => setLightboxEvent(null)}
          >
            &times;
          </button>

          <div
            className='relative max-w-3xl max-h-[85vh] w-full flex flex-col items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/uploads/${lightboxEvent.poster}`}
              alt={lightboxEvent.title}
              className='max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl'
            />
            <div className='mt-4 text-center px-4'>
              <div className='text-white font-bold uppercase text-sm tracking-wide'>{lightboxEvent.title}</div>
              <div className='mt-1 text-gray-300 text-xs flex items-center justify-center gap-4'>
                <span className='flex items-center gap-1'>
                  <EventIcon sx={{ fontSize: 14 }} />
                  {lightboxEvent.date}
                </span>
                <span className='flex items-center gap-1'>
                  <LocationOn sx={{ fontSize: 14 }} />
                  {lightboxEvent.venue}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Events;