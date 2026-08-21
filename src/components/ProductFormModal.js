import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ColorPicker from './ColorPicker';
import ImageDropzone from './ImageDropzone';

const emptyForm = {
  productName: '',
  type: '',
  price: 0,
  description: '',
  size: '',
  colors: [],
  imageSrc: [],
  imageUrl: [],
  termsChecked: false,
};

function ProductFormModal({ isOpen, mode, initialValues, categories, submitLoading, errorText, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);

  // Reset/populate the form fresh every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(initialValues ? { ...emptyForm, ...initialValues, termsChecked: false } : emptyForm);
    }
  }, [isOpen, initialValues]);

  if (!isOpen) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleColor = (color) => {
    setForm((f) => ({
      ...f,
      colors: f.colors.includes(color) ? f.colors.filter((c) => c !== color) : [...f.colors, color],
    }));
  };

  const handleFilesAdded = (files) => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setForm((f) => ({ ...f, imageSrc: [...f.imageSrc, ...files], imageUrl: [...f.imageUrl, ...urls] }));
  };

  const handleRemoveImage = (index) => {
    setForm((f) => ({
      ...f,
      imageSrc: f.imageSrc.filter((_, i) => i !== index),
      imageUrl: f.imageUrl.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-lg relative w-full mx-5 lg:w-1/3 text-xs" onClick={(e) => e.stopPropagation()}>
        <div className="mt-2">
          <div className="font-bold">Product Images</div>
          <ImageDropzone imageUrl={form.imageUrl} onFilesAdded={handleFilesAdded} onRemove={handleRemoveImage} />
        </div>

        <div className="mt-2">
          <div className="font-bold">Product Title</div>
          <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" type="text" value={form.productName} placeholder="Product name" onChange={set('productName')} required />
        </div>

        <div className="mt-4">
          <div className="font-bold">Category</div>
          <select className="mt-1 w-full p-2 border border-gray-400 rounded-lg" value={form.type} onChange={set('type')}>
            <option value=""></option>
            {categories.map((category) => (
              <option key={category.category} value={category.category}>{category.category}</option>
            ))}
          </select>
        </div>

        <div className="mt-2">
          <div className="font-bold">Description</div>
          <textarea className="mt-1 w-full p-2 border border-gray-400 rounded-lg" rows="2" value={form.description} placeholder="Enter some description" onChange={set('description')} required />
        </div>

        <div className="mt-2">
          <div className="font-bold">Size (in cm)</div>
          <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" type="text" value={form.size} placeholder="50 X 40" onChange={set('size')} required />
        </div>

        <ColorPicker colors={form.colors} onToggle={toggleColor} />

        <div className="mt-2">
          <div className="font-bold">Price</div>
          <input className="mt-1 w-full p-2 border border-gray-400 rounded-lg" type="number" value={form.price} placeholder="0" onChange={set('price')} required />
        </div>

        {mode === 'add' && (
          <div className="mt-2 flex gap-2">
            <input
              type="checkbox"
              checked={form.termsChecked}
              onChange={(e) => setForm((f) => ({ ...f, termsChecked: e.target.checked }))}
            />
            <div>
              I have read the <b>Terms and conditions</b>. If not read <Link className="text-blue-600 hover:text-blue-400" to="/terms">here</Link>
            </div>
          </div>
        )}

        {errorText && <div className="mt-2 flex gap-2 text-red-600">{errorText}</div>}

        <div className="flex justify-center gap-5 mt-2">
          <button
            className="border border-gray-500 hover:bg-gray-500 hover:text-white p-2 rounded-lg"
            onClick={(e) => { e.preventDefault(); onClose(); }}
          >
            Cancel
          </button>
          {!submitLoading ? (
            <button
              className="bg-purple-900 hover:bg-purple-700 p-2 text-white rounded-lg"
              onClick={(e) => { e.preventDefault(); onSubmit(form); }}
            >
              Submit
            </button>
          ) : (
            <button className="bg-gray-300 p-2 text-black rounded-lg" onClick={(e) => e.preventDefault()}>
              Loading...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductFormModal;