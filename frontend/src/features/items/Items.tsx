import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import Item from './Item';
import ItemForm from './ItemForm';
import { selectItems, fetchItemsAsync, Statuses, selectStatus, updateItemAsync } from './itemSlice';

function Items() {
  const items = useAppSelector(selectItems);
  const status = useAppSelector(selectStatus);
  const dispatch = useDispatch<AppDispatch>();

  const [itemToEdit, setItemToEdit] = useState(0);

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, [dispatch])

  function toggleEditForm(item_id?: number) {
    if (itemToEdit === item_id) {
      setItemToEdit(0);
    } else {
      setItemToEdit(item_id as number);
    }
  }

  function submitEdit(formData: any) {
    dispatch(updateItemAsync(formData));
    toggleEditForm();
  }

  let contents;

  if (status !== Statuses.UpToDate) {
    console.log("status", status)
    contents = <div>{status}</div>
  } else {
    contents = <div className='card'>
      <h3>{status}</h3>
      <ItemForm />
      {items && items.length > 0 && items.map((item: any) => {
        return <div key={item.id} style={{margin: "5em"}}>
          <Item
            dispatch={dispatch}
            item={item}
            toggleEditForm={() => toggleEditForm(item.id)}
            itemToEdit={itemToEdit}
            submitEdit={submitEdit} />
          </div>
      })}
    </div>
  }

  return (
    <div>
      <h1>Items</h1>
      {contents}
    </div>
  )
}

export default Items;