import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { createItemAsync } from './itemSlice';

function ItemForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [picturePath, setPicturePath] = useState('');

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      item: {
        name: name,
        description: description,
        amount: amount,
        price: price,
        picturePath: picturePath
      }
    }
    dispatch(createItemAsync(formData));
    resetState();
  }

  function resetState() {
    setName('');
    setDescription('');
    setAmount(0);
    setPrice(0.0);
    setPicturePath('');
  }

  return (
    <div>
      <h1>Form</h1>
      <form>
        <input
          type='text'
          className='form-control text-start'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className='form-control text-start'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='number'
          className='form-control text-start'
          name='amount'
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <input
          type='number'
          className='form-control text-start'
          name='price'
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        <input
          type='text'
          className='form-control text-start'
          name='picturePath'
          value={picturePath}
          onChange={(e) => setPicturePath(e.target.value)}
        />
        <button
          type='submit'
          onClick={(e) => submitHandler(e)}>Submit</button>
      </form>
    </div>
  )
}

export default ItemForm;