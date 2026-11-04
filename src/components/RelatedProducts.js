import React, { useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
const RELATED_COUNT = 6;

// Same seed all day: related lists stay stable within a day, and the server
// can reuse its cached shuffle across every visitor and product page.
const DAILY_SEED = `related-${new Date().toDateString().replace(/\s/g, '-')}`;

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const RelatedCard = memo(({ item }) => (
    <Link
        to="/preview"
        onClick={scrollToTop}
        className="group relative bg-white p-2 rounded-lg transform transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
        state={{ data: item }}
    >
        <div className="flex flex-col h-full">
            <div className="flex justify-center items-center h-52 bg-gray-100 rounded-md overflow-hidden">
                <img
                    src={`${API_URL}/thumb/${item.image[0]}`}
                    alt={item.productName}
                    loading="lazy"
                    decoding="async"
                    className="transition-all duration-300 object-cover w-full h-full rounded-md group-hover:scale-105"
                />
            </div>

            <div className="text-center font-bold mt-3 text-sm truncate">
                {item.productName}
            </div>

            <div className="text-center text-purple-900 font-montserrat text-sm">
                Ksh {item.price.toLocaleString()}
            </div>
        </div>
    </Link>
));

function RelatedProducts({ category, currentItemId }) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!category) {
            setProducts([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        setLoading(true);
        setError(false);

        const params = new URLSearchParams({
            page: '1',
            limit: String(RELATED_COUNT + 2), // spare items in case the current one is included
            seed: DAILY_SEED,
            category,
            exact: '1', // exact `type` match, same as the mobile version
        });

        fetch(`${API_URL}/get_approved_products?${params}`, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error('Request failed');
                return res.json();
            })
            .then((json) => {
                const items = (Array.isArray(json) ? json : json.products ?? [])
                    .filter((p) => p._id !== currentItemId)
                    .slice(0, RELATED_COUNT);
                setProducts(items);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name === 'AbortError') return;
                console.log(err);
                setError(true);
                setLoading(false);
            });

        return () => controller.abort(); // cancel when category/product changes or on unmount
    }, [category, currentItemId]);

    // Nothing to show: hide the whole section rather than an empty heading
    if (!loading && (error || products.length === 0)) return null;

    return (
        <div className="mb-10">
            <div className="font-bold border-b-2 border-purple-900 hover:border-purple-700 w-40 text-center uppercase text-sm mx-5 lg:mx-0">
                Related Products
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-montserrat mt-5">
                {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="p-2">
                              <div className="h-52 bg-gray-200 rounded-md animate-pulse" />
                              <div className="h-3 bg-gray-200 rounded mt-3 animate-pulse" />
                              <div className="h-3 bg-gray-200 rounded mt-2 w-1/2 mx-auto animate-pulse" />
                          </div>
                      ))
                    : products.map((item) => <RelatedCard key={item._id} item={item} />)}
            </div>
        </div>
    );
}

export default RelatedProducts;