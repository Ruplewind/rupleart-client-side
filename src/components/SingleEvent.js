import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleEvent() {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNotFound(false);

        // Try a direct single-event endpoint first.
        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('not-found-direct');
                return res.json();
            })
            .then((data) => {
                if (!data || data.error) throw new Error('not-found-direct');
                setEvent(data);
                setLoading(false);
            })
            .catch(() => {
                // Fall back to the events list and find the matching id,
                // in case there isn't a dedicated single-event endpoint.
                fetch(`${process.env.REACT_APP_API_URL}/events`)
                    .then((res) => res.json())
                    .then((data) => {
                        const found = Array.isArray(data) ? data.find(e => e._id === id) : null;
                        if (found) {
                            setEvent(found);
                        } else {
                            setNotFound(true);
                        }
                        setLoading(false);
                    })
                    .catch(() => {
                        setNotFound(true);
                        setLoading(false);
                    });
            });
    }, [id]);

    useEffect(() => {
        if (event) {
            document.title = `${event.title} | Rupleart Events`;
        }
        return () => { document.title = 'Rupleart'; };
    }, [event]);

    const shareUrl = window.location.href;

    const isPast = event ? event.date < new Date().toISOString().split('T')[0] : false;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl)
            .then(() => toast.success('Link copied to clipboard', { autoClose: 1500 }))
            .catch(() => toast.error('Could not copy link', { autoClose: 1500 }));
    };

    if (loading) {
        return (
            <div className='min-h-[60vh] flex flex-col items-center justify-center font-montserrat'>
                <div className='w-10 h-10 border-2 border-gray-200 border-t-purple-900 rounded-full animate-spin mb-4'></div>
                <p className='text-sm text-gray-500'>Loading event...</p>
            </div>
        );
    }

    if (notFound || !event) {
        return (
            <div className='min-h-[60vh] flex flex-col items-center justify-center font-montserrat px-4 text-center'>
                <EventIcon sx={{ fontSize: 36 }} className='text-gray-300 mb-3' />
                <p className='text-base font-semibold text-gray-700 mb-1'>Event not found</p>
                <p className='text-sm text-gray-500 mb-6'>This event may have been removed or the link is incorrect.</p>
                <Link to={'/events'} className='text-sm bg-purple-900 hover:bg-purple-700 transition-colors text-white px-5 py-2 rounded-lg'>
                    Browse all events
                </Link>
            </div>
        );
    }

    return (
        <div className='font-montserrat pb-14'>
            <ToastContainer />

            <div className='w-full lg:w-3/4 mx-auto pt-5 px-4'>
                <Link to={'/events'} className='inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-900 transition-colors'>
                    <ArrowBackIcon sx={{ fontSize: 16 }} />
                    Back to Events
                </Link>
            </div>

            {/* Poster */}
            <div className='w-full lg:w-3/4 mx-auto mt-4 px-4'>
                <div className='relative w-full h-64 lg:h-96 rounded-xl overflow-hidden bg-gray-100'>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${event.poster}`}
                        className={`absolute inset-0 w-full h-full object-cover scale-110 blur-md opacity-70 ${isPast ? 'grayscale-[15%]' : ''}`}
                        alt=""
                        aria-hidden="true"
                    />
                    <span className='absolute inset-0 bg-black/10'></span>
                    <img
                        src={`${process.env.REACT_APP_API_URL}/uploads/${event.poster}`}
                        className={`relative w-full h-full object-contain ${isPast ? 'grayscale-[15%]' : ''}`}
                        alt={event.title}
                    />
                    <span className={`absolute top-4 left-4 text-[11px] uppercase tracking-wide font-semibold px-3 py-1 rounded-full text-white ${isPast ? 'bg-gray-700' : 'bg-purple-900'}`}>
                        {isPast ? 'Past Event' : 'Upcoming'}
                    </span>
                </div>
            </div>

            {/* Details */}
            <div className='w-full lg:w-3/4 mx-auto mt-6 px-4'>
                <h1 className='font-serif italic text-purple-950 text-2xl lg:text-3xl leading-snug'>
                    {event.title}
                </h1>

                <div className='flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-600'>
                    <span className='flex items-center gap-2'>
                        <EventIcon sx={{ fontSize: 16 }} className='text-[#b8925a]' />
                        {event.date}
                    </span>
                    <span className='flex items-center gap-2'>
                        <LocationOnIcon sx={{ fontSize: 16 }} className='text-[#b8925a]' />
                        {event.venue}
                    </span>
                </div>

                <p className='mt-6 text-sm text-gray-700 leading-relaxed'>
                    {event.description}
                </p>

                {/* Share */}
                <div className='mt-10 pt-6 border-t border-gray-200'>
                    <div className='text-xs uppercase tracking-[0.2em] text-[#b8925a] font-semibold mb-3'>
                        Share this event
                    </div>
                    <div className='flex flex-wrap items-center gap-3'>
                        <button
                            onClick={handleCopyLink}
                            className='flex items-center gap-2 text-sm border border-gray-300 hover:border-purple-900 hover:text-purple-900 transition-colors px-4 py-2 rounded-lg'
                        >
                            <ContentCopyIcon sx={{ fontSize: 16 }} />
                            Copy link
                        </button>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(`${event.title} — ${shareUrl}`)}`}
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-2 text-sm border border-gray-300 hover:border-green-600 hover:text-green-600 transition-colors px-4 py-2 rounded-lg'
                        >
                            <WhatsAppIcon sx={{ fontSize: 16 }} />
                            WhatsApp
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target='_blank'
                            rel='noreferrer'
                            className='flex items-center gap-2 text-sm border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg'
                        >
                            <FacebookIcon sx={{ fontSize: 16 }} />
                            Facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleEvent;