import React, { useEffect, useState } from 'react';
import ButtonGroup from './ButtonGroup';
import { itemSlice } from './itemSlice';

function Item(props: any) {
  const [name, setName] = useState(props.item.name);
  const [description, setDescription] = useState(props.item.description);
  const [amount, setAmount] = useState(props.item.amount);
  const [price, setPrice] = useState(props.item.price);
  const [picturePath, setPicturePath] = useState(props.item.picturePath);
  const [isEditing, setIsEditing] = useState(props.itemToEdit === props.item.id);

  useEffect(() => {
    setIsEditing(props.itemToEdit === props.item.id);
  }, [props.itemToEdit, props.item.id])

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      item: {
        id: props.item.id,
        name: name,
        description: description,
        amount: amount,
        price: price,
        picturePath: picturePath
      }
    }
    props.submitEdit(formData);
    resetState();
  }

  function resetState() {
    setName(props.item.name);
    setDescription(props.item.description);
    setAmount(props.item.amount);
    setPrice(props.item.price);
    setPicturePath(props.item.picturePath);
  }

  const nameElement = <h2 className='title text-start'>{props.item.name}</h2>
  const descriptionElement = <p className='card-text text-start'>{props.item.description}</p>
  const amountElement = <p className='title text-start'>{props.item.amount}</p>
  const priceElement = <p className='title text-start'>{props.item.price}</p>
  const picturePathElement = <p className='title text-start'>{props.item.picturePath}</p>

  const editableName = <input
                        type='text'
                        className='form-control text-start'
                        value={name}
                        onChange={(e) => setName(e.target.value)} />

  const editableDrescription = <textarea
                                className='form-control text-start'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />

  const editableAmount = <input
                          type='number'
                          className='form-control text-start'
                          value={amount}
                          onChange={(e) => setAmount(parseInt(e.target.value))} />

  const editablePrice = <input
                          type='number'
                          className='form-control text-start'
                          name='price'
                          value={price}
                          onChange={(e) => setPrice(parseInt(e.target.value))} />

  const editablePicturePath = <input
                                type='text'
                                className='form-control text-start'
                                name='picturePath'
                                value={picturePath}
                                onChange={(e) => setPicturePath(e.target.value)} />

  const submitButton = <button
                        type='submit'
                        className='form-control'
                        onClick={(e) => submitHandler(e)}>Submit</button>

  return (
    <div>
      <div className='row'>
        <div className='col-8'>
          {isEditing ? editableName : nameElement}
        </div>
        <div className='col-4'>
          <ButtonGroup
            item_id={props.item.id}
            dispatch={props.dispatch}
            toggleEditForm={props.toggleEditForm} />
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
          {isEditing ? editableDrescription : descriptionElement}
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
          {isEditing ? editableAmount : amountElement}
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
          {isEditing ? editablePrice : priceElement}
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
          {isEditing ? editablePicturePath : picturePathElement}
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          {isEditing ? submitButton : ""}
        </div>
      </div>
    </div>
  )
}

export default Item;