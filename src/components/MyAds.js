import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import ProductFormModal from '../components/ProductFormModal';
import { COLOR_SWATCHES } from '../components/ColorPicker';

function MyAds() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [myads, setMyads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editInitialValues, setEditInitialValues] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/my_products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) return res.json();
        if (res.status === 401) navigate('/login');
      })
      .then((data) => {
        setMyads(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/get_categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.log(err));
  }, []);

  const buildFormData = (form) => {
    const formData = new FormData();
    formData.append('productName', form.productName);
    formData.append('type', form.type);
    formData.append('price', form.price);
    form.imageSrc.forEach((image) => formData.append('image', image));
    formData.append('description', form.description);
    formData.append('size', form.size);
    form.colors.forEach((color) => formData.append('colors', color));
    return formData;
  };

  const isFormValid = (form) =>
    form.productName && form.price >= 1 && form.imageSrc.length > 0 && form.type && form.size && form.description;

  const handleAdd = (form) => {
    if (!isFormValid(form)) {
      toast('All fields must be filled', { type: 'error' });
      return;
    }
    if (!form.termsChecked) {
      toast('Terms and conditions must be checked', { type: 'error' });
      return;
    }

    setSubmitLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/add_product`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: buildFormData(form),
    })
      .then((res) => {
        setSubmitLoading(false);
        if (res.ok) {
          setIsAddOpen(false);
          toast('Success', { type: 'success' });
          setTimeout(() => window.location.reload(), 500);
        } else {
          res.json().then((err) => {
            setErrorText(err.error || '');
            toast(err.error === 'Invalid Token' ? 'Login to Continue' : 'Server Error', { type: 'error' });
          });
        }
      })
      .catch(() => {
        setSubmitLoading(false);
        toast('Server Error', { type: 'error' });
      });
  };

  const handleEdit = (form) => {
    if (!isFormValid(form)) {
      toast('All fields must be filled', { type: 'error' });
      return;
    }

    setSubmitLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/edit_product/${editId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: buildFormData(form),
    })
      .then((res) => {
        setSubmitLoading(false);
        if (res.ok) {
          setIsEditOpen(false);
          toast('Success', { type: 'success' });
          setTimeout(() => window.location.reload(), 500);
        } else {
          res.json().then((err) => {
            toast(err.error === 'Invalid Token' ? 'Login to Continue' : 'Server Error', { type: 'error' });
          });
        }
      })
      .catch(() => {
        setSubmitLoading(false);
        toast('Server Error', { type: 'error' });
      });
  };

  const handleDeleteItem = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/del_product/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        toast(res.ok ? 'Success' : 'Server Error', { type: res.ok ? 'success' : 'error' });
        if (res.ok) setTimeout(() => window.location.reload(), 700);
      })
      .catch(() => toast('Server Error', { type: 'error' }));
  };

  const handleAvailabilityToggle = (id, value) => {
    fetch(`${process.env.REACT_APP_API_URL}/change_availability/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ value }),
    })
      .then((res) => {
        toast(res.ok ? 'Status Updated' : 'Server Error', { type: res.ok ? 'success' : 'error' });
        if (res.ok) window.location.reload();
      })
      .catch(() => toast('Server Error', { type: 'error' }));
  };

  const openEditFor = (ad) => {
    setEditId(ad._id);
    setEditInitialValues({
      productName: ad.productName,
      type: ad.type,
      price: ad.price,
      description: ad.description,
      size: ad.size,
      colors: ad.colors || [],
      imageSrc: ad.image,
      imageUrl: ad.image.map((image) => `${process.env.REACT_APP_API_URL}/uploads/${image}`),
    });
    setIsEditOpen(true);
  };

  return (
    <div className="w-5/6 lg:w-3/4 mx-5 lg:mx-auto font-montserrat mt-10 mb-10">
      <ToastContainer />
      <div className="text-xl font-bold uppercase">My Ads</div>

      <div className="flex justify-end">
        <button
          onClick={(e) => { e.preventDefault(); setIsAddOpen(true); }}
          className="bg-purple-900 hover:bg-purple-700 p-2 px-4 text-xs rounded-lg text-white"
        >
          + Create an Ad
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="mt-5 w-full border bg-white min-w-full text-xs lg:text-sm uppercase">
          <thead>
            <tr className="bg-gray-200 p-2">
              <th className="p-2">Product ID</th>
              <th className="p-2">Image</th>
              <th className="p-2">Title/Description</th>
              <th className="p-2">Category</th>
              <th className="p-2">Size</th>
              <th className="p-2">Colors</th>
              <th className="p-2">Price</th>
              <th className="p-2">In Stock?</th>
              <th className="p-2">Approval Status</th>
              <th className="p-2">Edit</th>
              <th className="p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-2">Loading...</td></tr>
            ) : error ? (
              <tr><td className="p-2">Something went wrong</td></tr>
            ) : myads.length === 0 ? (
              <tr><td className="p-2">No Records</td></tr>
            ) : (
              myads.map((ad) => (
                <tr
                  key={ad._id}
                  className="cursor-pointer odd:bg-gray-50 even:bg-white hover:bg-gray-100 border-b border-gray-300 transition-colors"
                  onClick={(e) => { e.stopPropagation(); openEditFor(ad); }}
                >
                  <td className="text-center p-2">#{ad.productId}</td>
                  <td className="flex justify-center p-2">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/uploads/${ad.image[0]}`}
                      alt={ad.productName}
                      className="w-30 h-20 object-cover"
                    />
                  </td>
                  <td className="p-2">
                    <div className="font-bold">{ad.productName}</div>
                    <div>{ad.description}</div>
                  </td>
                  <td className="text-center p-2">{ad.type}</td>
                  <td className="text-center p-2">{ad.size} cm</td>
                  <td className="text-center p-2">
                    {ad.colors && ad.colors.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-1 max-w-[110px] mx-auto">
                        {ad.colors.map((color, idx) => (
                          <span
                            key={idx}
                            title={color}
                            className="w-4 h-4 rounded-full border border-gray-300 inline-block cursor-default"
                            style={{ backgroundColor: COLOR_SWATCHES[color] || '#ccc' }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 normal-case">—</span>
                    )}
                  </td>
                  <td className="text-center p-2">Ksh. {ad.price}</td>
                  <td className="text-center p-2">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        className="border border-black"
                        checked={ad.availability}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleAvailabilityToggle(ad._id, e.target.checked)}
                      />
                    </div>
                  </td>
                  <td className="text-center p-2">
                    {ad.approvalStatus === 0 ? (
                      <div className="bg-gray-300 text-xs rounded-2xl p-1 w-full lg:w-3/4 mx-auto">Pending approval</div>
                    ) : ad.approvalStatus === 1 ? (
                      <div className="bg-green-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white">Approved</div>
                    ) : (
                      <div>
                        <div className="bg-red-500 text-xs rounded-2xl p-1 w-full lg:w-1/2 mx-auto text-white">Rejected</div>
                        {ad.disapproval_reason && (
                          <div className="mt-2 text-xs capitalize">
                            <b>Reason:</b> {ad.disapproval_reason}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-2">
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditFor(ad); }}
                        className="bg-blue-900 hover:bg-blue-700 p-1 text-white rounded-lg text-xs px-2"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteItem(ad._id); }}
                        className="bg-red-900 hover:bg-red-700 p-1 text-white rounded-lg text-xs px-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductFormModal
        isOpen={isAddOpen}
        mode="add"
        initialValues={null}
        categories={categories}
        submitLoading={submitLoading}
        errorText={errorText}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAdd}
      />

      <ProductFormModal
        isOpen={isEditOpen}
        mode="edit"
        initialValues={editInitialValues}
        categories={categories}
        submitLoading={submitLoading}
        errorText={errorText}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEdit}
      />
    </div>
  );
}

export default MyAds;