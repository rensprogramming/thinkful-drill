'use strict';

const STORE = [
    {name: "apples", checked: false},
    {name: "oranges", checked: false},
    {name: "milk", checked: true},
    {name: "bread", checked: false}
  ];

  function generateItemElement(item,) {
    return `
    <li data-item-id="${item.id}"><span class="shopping-item js-shopping-item ${item.checked ?
      "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
      <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
      <span class="button-label">delete</span>
      </button>
      </div>
      </li>`;
}


 function generateShoppingListItemsString(shoppingList) {
      console.log("Generating shopping list element");

      const items = shoppingList.map((item) => generateItemElement(item));

      return items.join("");
  }




  // this function will be responsible for rendering the shopping list in the DOM
function renderShoppingList() {
    console.log('`renderShoppingList` ran'); 
    const shoppingListItemsString = generateShoppingListItemsString(STORE);
    $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.push({id: cuid(), name: itemName, checked: false});
}

// this function will be responsible for when users add a new shopping list item
function handleNewItemSubmit () {
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        console.log('`handleNewItemSubmit` ran');
        const newItemName = $('.js-shopping-list-entry').val();
        console.log(newItemName);
        $('.js-shopping-list-entry').val('');
        addItemToShoppingList(newItemName);
        renderShoppingList();
    });
    }

    function toggleCheckedForListItem(itemId) {
        console.log("Toggling checked property for item with id " + itemId);
        const item = STORE.find(item => item.id === itemId);
        item.checked = !item.checked;
    }

    function getItemIdFromElement(item) {
        return $(item)
        .closest('li')
        .data('item-id');
    }

// this function will be responsible for when users click the 'check' button on a shopping list item
function handleItemCheckClicked () {
    $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
        console.log('`handleItemCheckClicked` ran');
        const itemId = getItemIdFromElement(event.currentTarget);
        toggleCheckedForListItem(id);
        renderShoppingList();
    });
   
}

function deleteListItem(itemId) {
    console.log(`Deleting item with id ${itemId} from shopping list`)
    const itemIndex = STORE.findIndex(item => item.id === itemId);
    STORE.splice(itemIndex, 1);
}

// this function will be responsible for when users want to delete a shopping list
  // item

  function handleDeleteItemClicked () {
     $('.js-shopping-list').on('click', '.js-item-delete', event => {
         const itemId = getItemIdFromElement(event.currentTarget);
         deleteListItem(itemId);
         renderShoppingList();
     });
  }

  // this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.

function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
}

// when the page loads, call 'handleShoppingList'
$(handleShoppingList);