import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //Update state by passing the array of items to setItems - Display items
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then(r => r.json())
      .then(items => setItems(items));
  }, []);

  //(post3) Add this function! to pass a callback function as a prop for ItemForm file (ShoppingList is the parent component of ItemForm)
  //Add a handleAddItem function to ShoppingList, and pass a reference to that function as a prop called onAddItem to the ItemForm:
  function handleAddItem(newItem) {
    setItems([...items, newItem]); //(post4)setState with a new array with our current items from state, plus the new item at the end
  }

  //(patch2) Add this callback function to pass it as a prop to the Item component
  //Call setState by creating a new array which contains the updated item in place of the old item. Use .map create this new array
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  //(delete2) Add this callback function to pass it as a prop to the Item component
  //Call setState with a new array that removes the deleted item from the list. Use .filter to help create this new array:
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter(item => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter(item => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      {/* (post5) add the onAddItem prop! */}
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* (patch3) pass it as a prop to Item */}
        {/* (delete3) pass it as a prop to Item */}
        {itemsToDisplay.map(item => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
