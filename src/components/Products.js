import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import useCart from '../utils/CartContext';

const Products = ({ category }) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 21;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/get_approved_products`)
            .then((res) => res.json())
            .then((res) => {
                setProducts(res.reverse());
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setError(true);
            });
    }, []);

    const filteredData = products.filter((item) => {
        const matchesCategory =
            category === '' || category === null
                ? true
                : item.type.toLowerCase().includes(category.toLowerCase());

        if (!matchesCategory) return false;

        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;

        const nameMatch = (item.productName || '').toLowerCase().includes(query);
        const categoryMatch = (item.type || '').toLowerCase().includes(query);

        return nameMatch || categoryMatch;
    });

    useEffect(()=>{
        setCurrentPage(1)
    }, [category, searchQuery])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const { addToCart } = useCart();
    const handleAddToCart = (data) => {
        addToCart({ ...data, quantity: 1 });
    };

    return (
        <div className='mt-2 lg:mt-5 mx-2 lg:mx-5'>
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

            {loading && <div className="text-center text-slate-500 text-md mb-5">Loading...</div>}
            <div className="text-center font-bold text-slate-500 text-md mb-1 capitalize">
                {searchQuery
                    ? `Results for "${searchQuery}"`
                    : (category == null ? <div>All Artworks</div> : category)
                }
            </div>
            <div className="text-center text-slate-500 text-md mb-5 text-sm">
                ({!loading && filteredData.length} items)
            </div>

            {!loading && filteredData.length === 0 && (
                <div className="text-center text-slate-400 text-sm mb-10">
                    No products found. Try a different search.
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 font-montserrat">
                {!loading &&
                    currentItems.map((item) => (
                        <Link
                            to="/preview"
                            className="bg-white p-1 lg:p-4 pb-2 lg:pb-4 rounded-lg shadow-lg group"
                            key={item._id}
                            state={{ data: item }}
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex justify-center items-center h-44 lg:h-64">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/uploads/${item.image[0]}`}
                                        alt={item.productName}
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
                                        onClick={() => handleAddToCart(item)}
                                        className="bg-purple-900 hover:bg-purple-700 text-white px-4 py-2 text-sm uppercase rounded-lg mt-3"
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-5 space-x-3">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700 text-md font-semibold">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Products;