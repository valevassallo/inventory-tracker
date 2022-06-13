json.extract! item, :id, :name, :description, :amount, :price, :picturePath, :created_at, :updated_at
json.url item_url(item, format: :json)
