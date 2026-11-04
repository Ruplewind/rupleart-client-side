import { Link } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback, memo } from 'react';
import useCart from '../utils/CartContext';

const API_URL = process.env.REACT_APP_API_URL;
const PAGE_SIZE = 12;

// Created once per page load: new shuffle on every visit/refresh,
// stable order while scrolling through pages.
const SESSION_SEED = Math.random().toString(36).slice(2);

function useDebounce(value, delay = 400) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

// Memoized so adding to cart (or loading more) doesn't re-render existing cards
const ProductCard = memo(({ item, onAddToCart }) => (
    <Link
        to="/preview"
        className="bg-white p-1 lg:p-4 pb-2 lg:pb-4 rounded-lg shadow-lg group"
        state={{ data: item }}
    >
        <div className="flex flex-col h-full">
            <div className="flex justify-center items-center h-44 lg:h-64 bg-gray-100 rounded-md">
                <img
                    src={`${API_URL}/thumb/${item.image[0]}`}
                    alt={item.productName}
                    loading="lazy"
                    decoding="async"
                    className="object-cover w-full h-full rounded-md"
                />
            </div>
            <div className="text-center font-bold text-lg mt-3 truncate">{item.productName}</div>
            <div className="text-center text-purple-900 mt-2">Ksh {item.price.toLocaleString()}</div>
            <div className="text-center text-sm text-gray-700 mt-2 lg:group-hover:max-h-20 lg:max-h-0 overflow-hidden transition-all duration-300">
                <p className="line-clamp-2">{item.description}</p>
            </div>
            <div className="flex justify-center mt-auto lg:max-h-0 lg:overflow-hidden group-hover:max-h-20 transition-all duration-300">
                <button
                    onClick={(e) => {
                        e.preventDefault(); // don't navigate to /preview
                        onAddToCart(item);
                    }}
                    className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 text-sm uppercase rounded-lg mt-3"
                >
                    Add to cart
                </button>
            </div>
        </div>
    </Link>
));

const Products = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);          // first page / reset
    const [loadingMore, setLoadingMore] = useState(false); // next pages
    const [error, setError] = useState(false);
    const [loadMoreError, setLoadMoreError] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const debouncedSearch = useDebounce(searchQuery);

    // Refs prevent duplicate requests and stale responses
    const pageRef = useRef(1);
    const hasMoreRef = useRef(true);
    const fetchingRef = useRef(false);
    const requestIdRef = useRef(0);
    const sentinelRef = useRef(null);

    const { addToCart } = useCart();
    const addToCartRef = useRef(addToCart);
    addToCartRef.current = addToCart;

    // Stable handler so memoized cards never re-render because of the cart
    const handleAddToCart = useCallback((item) => {
        addToCartRef.current({ ...item, quantity: 1 });
    }, []);

    const loadProducts = useCallback(
        async (reset = false) => {
            if (!reset && (fetchingRef.current || !hasMoreRef.current)) return;

            // A reset invalidates any in-flight request
            const requestId = reset ? ++requestIdRef.current : requestIdRef.current;

            if (reset) {
                pageRef.current = 1;
                hasMoreRef.current = true;
                setHasMore(true);
                setProducts([]);
                setLoading(true);
                setError(false);
                setLoadMoreError(false);
            } else {
                setLoadingMore(true);
                setLoadMoreError(false);
            }
            fetchingRef.current = true;

            try {
                const page = pageRef.current;
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(PAGE_SIZE),
                    seed: SESSION_SEED,
                });
                if (debouncedSearch.trim()) params.append('search', debouncedSearch.trim());
                if (category && category.trim() && category.toLowerCase() !== 'all') {
                    params.append('category', category.trim());
                }

                const res = await fetch(`${API_URL}/get_approved_products?${params}`);
                if (!res.ok) throw new Error('Request failed');
                const json = await res.json();

                if (requestId !== requestIdRef.current) return; // stale response

                const items = Array.isArray(json) ? json : json.products ?? [];
                const more = Array.isArray(json)
                    ? items.length === PAGE_SIZE
                    : Boolean(json.hasMore);

                hasMoreRef.current = more;
                setHasMore(more);
                pageRef.current = page + 1;

                setProducts((prev) => {
                    if (reset) return items;
                    const seen = new Set(prev.map((p) => p._id));
                    return [...prev, ...items.filter((p) => !seen.has(p._id))];
                });
            } catch (err) {
                console.log(err);
                if (requestId !== requestIdRef.current) return;
                reset ? setError(true) : setLoadMoreError(true);
            } finally {
                if (requestId === requestIdRef.current) {
                    fetchingRef.current = false;
                    setLoading(false);
                    setLoadingMore(false);
                }
            }
        },
        [debouncedSearch, category]
    );

    // First page, and again whenever search or category changes
    useEffect(() => {
        loadProducts(true);
    }, [loadProducts]);

    // Always call the latest loader from the observer
    const loadProductsRef = useRef(loadProducts);
    loadProductsRef.current = loadProducts;

    // Infinite scroll: load the next page when the sentinel nears the viewport.
    // The observer is recreated when the list grows, so if the sentinel is still
    // visible after a load (tall screens), it immediately fetches again.
    useEffect(() => {
        const node = sentinelRef.current;
        if (!node || loading || error || loadMoreError || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) loadProductsRef.current(false);
            },
            { rootMargin: '600px 0px' } // start fetching ~600px before the bottom
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [products.length, loading, error, loadMoreError, hasMore]);

    return (
        <div className="mt-2 lg:mt-5 mx-2 lg:mx-5">
            {/* Search bar */}
            <div className="flex justify-center mb-5">
                <div className="relative w-full sm:w-2/3 lg:w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by product name or category"
                        className="w-full bg-gray-200 border border-gray-500 rounded-full py-2 pl-9 pr-9 text-sm text-slate-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-900 focus:bg-white transition-colors"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                            aria-label="Clear search"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="text-center font-bold text-slate-500 text-md mb-1 capitalize">
                {searchQuery
                    ? `Results for "${searchQuery}"`
                    : category ? category : 'All Items'}
            </div>

            {loading && <div className="text-center text-slate-500 text-md mb-5">Loading...</div>}

            {error && (
                <div className="text-center text-sm mb-10">
                    <p className="text-slate-500 mb-2">Error fetching products.</p>
                    <button
                        onClick={() => loadProducts(true)}
                        className="px-4 py-2 bg-purple-900 text-white rounded-lg"
                    >
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="text-center text-slate-400 text-sm mb-10">
                    No products found. Try a different search.
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 font-montserrat">
                {products.map((item) => (
                    <ProductCard key={item._id} item={item} onAddToCart={handleAddToCart} />
                ))}
            </div>

            {/* Sentinel + footer states */}
            <div ref={sentinelRef} className="h-10" />

            {loadingMore && (
                <div className="text-center text-slate-500 text-sm mb-5">Loading more...</div>
            )}

            {loadMoreError && (
                <div className="text-center text-sm mb-5">
                    <button
                        onClick={() => loadProducts(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                    >
                        Couldn't load more. Tap to retry
                    </button>
                </div>
            )}

            {!hasMore && !loading && products.length > 0 && (
                <div className="text-center text-slate-400 text-xs mb-5">You've reached the end.</div>
            )}
        </div>
    );
};

export default Products;