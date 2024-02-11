const listContainer = document.querySelector(".list-container");
const newItemForm = document.querySelector(".input-container");
const newItemInput = document.querySelector(".new.item");
const addBtn = document.querySelector(".add-btn");

// Initial state

let items = [
  {
    text: "Learn HTML",
    done: false
  },
  {
    text: "Learn CSS",
    done: false
  },
  {
    text: "Learn JavaScript",
    done: false
  }
];


// Add event listeners

addBtn.addEventListener('click', addItem);

newItemForm.addEventListener('submit', event => {
  event.preventDefault();
  addItem();
});


render(items, listContainer);


/**
 * Adds a new item to the list
 */
function addItem() {
  // Get the text from the input and remove any leading or trailing whitespace
  const text = newItemInput.value.trim();

  // If the text is not empty, create a new item and add it to the list
  if (text) {
    const item = {
      text: text,
      done: false
    };

    // Add the new item to the items array
    items.push(item);

    // Append a new list item to the list container based on the new item
    listContainer.append(createListItem(item));

    // Clear the input field after adding the item
    newItemInput.value = '';
  }
}


/**
 * Render the items by appending list items to the container
 */
function render(items, container) {
  items.forEach(item => container.append(createListItem(item)));
}


/**
 * Creates a list item based on the provided item object
 */
function createListItem(item) {
  // Create list item element
  const listItem = document.createElement('li');
  listItem.classList.add('item-container');

  // Add 'done' class if item is marked as done
  if (item.done) {
    listItem.classList.add('done');
  }

  // Create checkbox element with event listener to toggle 'done' class on list item
  const checkbox = document.createElement('div');
  checkbox.innerHTML = `
    <img src="images/todo.svg" alt="" class="unchecked">
    <img src="images/done.svg" alt="" class="checked">
  `;
  checkbox.addEventListener('click', () => {
    listItem.classList.toggle('done');
  });

  // Create input element for item text
  const itemInput = document.createElement('input');
  itemInput.setAttribute('type', 'text');
  itemInput.setAttribute('value', item.text);
  itemInput.classList.add('item');

  // Create delete button with event listener to remove item from list
  const deleteButton = document.createElement('div');
  deleteButton.innerHTML = `
    <img src="images/delete.svg" alt="" class="delete">
  `;
  deleteButton.addEventListener('click', () => {
    items = items.filter(i => i !== item);
    listItem.remove();
  });

  // Append checkbox, item input, and delete button to list item
  listItem.append(checkbox, itemInput, deleteButton);

  // Return the created list item
  return listItem;
}
