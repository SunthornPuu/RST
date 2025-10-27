'use client';

import React, { useState, useRef } from 'react';
import Backdrop from './backdrop';
import { create } from '../server';

const defaultPic = 'https://tse1.mm.bing.net/th/id/OIP.p4ESB4UTkD7dXkzpWUq5-QHaHa?cb=12ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3';

const fieldGroups = [
  [
    { name: 'name', placeholder: 'Name', type: 'text', className: 'form1' },
    { name: 'seller', placeholder: 'Supplier', type: 'text', className: 'form1' }
  ],
  [
    { name: 'xI', placeholder: 'width (in)', type: 'number', className: 'form3' },
    { name: 'yI', placeholder: 'height (in)', type: 'number', className: 'form3' },
    { name: 'zI', placeholder: 'depth (in)', type: 'number', className: 'form3' }
  ],
  [
    { name: 'xCm', placeholder: 'width (cm)', type: 'number', className: 'form3' },
    { name: 'yCm', placeholder: 'height (cm)', type: 'number', className: 'form3' },
    { name: 'zCm', placeholder: 'depth (cm)', type: 'number', className: 'form3' }
  ],
  [
    { name: 'price', placeholder: 'Price', type: 'number', className: 'form1' }
  ]
];

export default function Main({ isOpen, onClose, olddata ,dataHandle}) {
  const [data, setData] = useState(fieldGroups.flat().reduce((acc, f) => ({ ...acc, [f.name]: '' }), { img: '' }));
  const [preview, setPreview] = useState(defaultPic);
  const fileInputRef = useRef();

  const handleChange = (e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData(prev => ({ ...prev, img: file }));
    setPreview(file ? URL.createObjectURL(file) : defaultPic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = defaultPic;

    if (data.img && data.img.size > 0) {
      try {
        const formData = new FormData();
        formData.append('image', data.img);

        const res = await fetch('https://api.imgbb.com/1/upload?key=ae0dd8e2b70fbfa014d0b6270ed30980', {
          method: 'POST',
          body: formData
        });

        const result = await res.json();
        fileUrl = result?.data?.url || defaultPic;
      } catch (err) {
        console.error('imgBB upload failed:', err);
        fileUrl = defaultPic;
      }
    }

    const cleanForm = {
      name: data.name.trim() || 'none',
      seller: data.seller.trim() || 'none',
      xI: data.xI === '' ? -1 : parseFloat(data.xI),
      yI: data.yI === '' ? -1 : parseFloat(data.yI),
      zI: data.zI === '' ? -1 : parseFloat(data.zI),
      xCm: data.xCm === '' ? -1 : parseFloat(data.xCm),
      yCm: data.yCm === '' ? -1 : parseFloat(data.yCm),
      zCm: data.zCm === '' ? -1 : parseFloat(data.zCm),
      price: data.price === '' ? -1 : parseInt(data.price),
      img: fileUrl
    };

    console.log('Submitting:', cleanForm);
    await create(cleanForm,olddata,dataHandle);

    setData(fieldGroups.flat().reduce((acc, f) => ({ ...acc, [f.name]: '' }), { img: '' }));
    setPreview(defaultPic);
    if (fileInputRef.current) fileInputRef.current.value = '';

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <Backdrop onClick={onClose} />
      <div className="bg-white border-4 border-black rounded-3xl fixed inset-x-60 inset-y-30 z-20">
        <form className="w-full h-full flex flex-col items-center justify-center gap-y-6 text-2xl text-mono" onSubmit={handleSubmit}>
          {fieldGroups.map((row, idx) => (
            <div key={idx} className="mx-auto flex flex-row items-center justify-center gap-4">
              {row.map(f => (
                <input
                  key={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  name={f.name}
                  value={data[f.name]}
                  onChange={handleChange}
                  className={f.className}
                />
              ))}
            </div>
          ))}

          <div className="flex flex-col items-center gap-2">
            <img src={preview} alt="preview" className="w-40 h-40 object-contain border" />
            <input type="file" onChange={handleFileChange} ref={fileInputRef} className="button2" />
          </div>

          <button type="submit" className="button1 bg-green-300">OK</button>
        </form>
      </div>
    </div>
  );
}
