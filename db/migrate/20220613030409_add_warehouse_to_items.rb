class AddWarehouseToItems < ActiveRecord::Migration[7.0]
  def change
    add_reference :items, :warehouse
  end
end
