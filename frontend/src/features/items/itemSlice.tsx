import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
import { RootState } from '../../app/store';
import { fetchItems, createItem, destroyItem, updateItem } from './itemAPI';

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error"
}

export interface ItemFormData {
  item: {
    id?: number,
    name: string,
    description: string,
    amount: number,
    price: number,
    picturePath: string
  }
}

export interface ItemState {
  id?: number,
  name?: string,
  description?: string,
  amount?: number,
  price?: number,
  picturePath?: string,
  created_at?: any,
  updated_at?: any
}

export interface ItemsState {
  items: ItemState[];
  status: string;
}

export interface ItemUpdateData {
  item_id: number,
  item: ItemState
}

export interface ItemDeleteData {
  item: {
    item_id: number
  }
}

const initialState: ItemsState = {
  items: [
    {
      id: 0,
      name: "",
      description: "",
      amount: 0,
      price: 0.0,
      picturePath: "",
      created_at: "",
      updated_at: ""
    }
  ],
  status: Statuses.Initial
}

export const fetchItemsAsync = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await fetchItems();
    return response;
  }
)

export const createItemAsync = createAsyncThunk(
  'items/createItem',
  async (payload: ItemFormData) => {
    const response = await createItem(payload);

    return response;
  }
)

export const updateItemAsync = createAsyncThunk(
  'items/updateItem',
  async (payload: ItemFormData) => {
    const response = await updateItem(payload);

    return response;
  }
)

export const destroyItemAsync = createAsyncThunk(
  'items/destroyItem',
  async (payload: ItemDeleteData) => {
    const response = await destroyItem(payload);

    return response;
  }
)

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchItemsAsync.pending, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Loading;
      })
    })
    .addCase(fetchItemsAsync.fulfilled, (state, action) => {
      return produce(state, (draftState) => {
        draftState.items = action.payload;
        draftState.status = Statuses.UpToDate;
      })
    })
    .addCase(fetchItemsAsync.rejected, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
      })
    })
    .addCase(createItemAsync.pending, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Loading;
      })
    })
    .addCase(createItemAsync.fulfilled, (state, action) => {
      return produce(state, (draftState) => {
        draftState.items.push(action.payload);
        draftState.status = Statuses.UpToDate;
      })
    })
    .addCase(createItemAsync.rejected, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
      })
    })
    .addCase(updateItemAsync.pending, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Loading;
      })
    })
    .addCase(updateItemAsync.fulfilled, (state, action) => {
      return produce(state, (draftState) => {
        const index = draftState.items.findIndex(item => item.id === action.payload.item_id)
        draftState.items[index] = action.payload;
        draftState.status = Statuses.UpToDate;
      })
    })
    .addCase(updateItemAsync.rejected, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
      })
    })
    .addCase(destroyItemAsync.pending, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Loading;
      })
    })
    .addCase(destroyItemAsync.fulfilled, (state, action) => {
      return produce(state, (draftState) => {
        draftState.items = action.payload;
        draftState.status = Statuses.UpToDate;
      })
    })
    .addCase(destroyItemAsync.rejected, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
      })
    })
  }
})

export const {} = itemSlice.actions;

export const selectItems = (state: RootState) => state.items.items;

export const selectStatus = (state: RootState) => state.items.status;

export default itemSlice.reducer;