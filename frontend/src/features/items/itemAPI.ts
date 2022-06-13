import { ItemDeleteData, ItemFormData, ItemsState } from "./itemSlice";

const API_URL = "http://localhost:3000";

export async function fetchItems() {
  return fetch(`${API_URL}/items.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }).then((response) => response.json())
  .catch((error) => {
    console.log("Error: ", error);
    return {} as ItemsState;
  }) 
}

export async function createItem(payload: ItemFormData) {
  const item = payload.item;
  return fetch(`${API_URL}/items.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item })
  }).then((response) => response.json())
  .catch((error) => {
    console.log("Error: ", error);
    return {} as ItemsState;
  }) 
}

export async function updateItem(payload: ItemFormData) {
  const item = payload.item;
  return fetch(`${API_URL}/items/${item.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item })
  }).then((response) => response.json())
  .catch((error) => {
    console.log("Error: ", error);
    return {} as ItemsState;
  }) 
}

export async function destroyItem(payload: ItemDeleteData) {
  const item = payload.item;
  return fetch(`${API_URL}/items/${item.item_id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item })
  }).then((response) => response.json())
  .catch((error) => {
    console.log("Error: ", error);
    return {} as ItemsState;
  }) 
}