function getCurrentDateAndTime() {
  return new Date().toLocaleString();
}

let todos = [];

// First, our function needs to take in a task name * and * a date, so we'll need two parameters.

function printSingleTodoOnDOM(todoName, todoDate) {
  //* After we grab our`ol` and make our`li`, let's create two `p` tags, one for each bit of data we have. Give each of them the relevant data as an `innerText`.
  const ol = document.querySelector(".todo-list");
  const li = document.createElement("li");
  const p1 = document.createElement("p");
  p1.innerText = todoName;
  const p2 = document.createElement("p");
  p2.innerText = todoDate;
  // Now we'll have to append both of those elements to our `li`.
  li.appendChild(p1);
  li.appendChild(p2);
  //Then append that`li` to your ol like always and you're good to go! Our css will take care of the layout, though feel free to tinker with it. Or redo it entirely!
  ol.appendChild(li);
}

//Now let's write a function that prints all our todos out to the dom. Remember to pass in both the name *and* the date. Our single-todo-printing function is expecting them!

function printAllTodosOnDOM(todosArray) {
  todosArray.forEach(todo => printSingleTodoOnDOM(todo[0], todo[2]));
}

//Once you have both those functions, call the list - printing one and see if it displays our hard - coded data to the dom.If so, congrats!
printAllTodosOnDOM(todos);

//Now write a helper function that will add one todo to our data.It should take in a task name and add it to our todos, along with a`false` value for its completeness(it's not done if it was just added!) and the result of a call to our helper function `getCurrentDateAndTime` for its date.

function addTodoIntoArray(todoName, isComplete = false) {
  todos.push([todoName, isComplete, getCurrentDateAndTime()]);
}

// Next is a nice helper function to * remove * a todo from our data, given a specific index.Don't forget to remove it from other arrays if you're storing them that way!

function removeTodoFromArray(index) {
  todos.splice(index, 1);
}

// Now our function for actually taking user input and making a task out of it.It should be pretty easy given our helper functions:
//* Grab the user's input.
//* Call your function to add that task to our data.
//* And call your function to print one task to the dom.
//* Add an event listener to run that whole thing when the user presses ADD, and try it out!

function makeTaskFromUserInput() {
  const inputBox = document.querySelector(".todo-input");
  const inputedText = inputBox.value;
  addTodoIntoArray(inputedText);
  printSingleTodoOnDOM(inputedText, getCurrentDateAndTime());
  inputBox.value = "";
  reSelect();
}

const addButton = document.querySelector(".add-todo");
addButton.onclick = makeTaskFromUserInput;

// Write a helper function to clear the list.Don't just copy-paste from earlier work, though you can refer back to it while typing if you need to.

function clearDom() {
  const ol = document.querySelector(".todo-list");
  while (ol.firstChild) {
    ol.removeChild(ol.firstChild);
  }
}

// Now we need a helper function to mark a todo in our data complete, given an index.It only needs to handle those booleans!

function markComplete(index) {
  if (todos[index][1] === false) {
    todos[index][1] = true;
  } else {
    todos[index][1] = false;
  }
}

//Now a helper function that changes the style of the dom given an index.You can either adjust for the off - by - one error here or when the function is called, but make sure you do it somewhere!

function changeElementstyle(index) {
  const ol = document.querySelector(".todo-list");
  ol.children[index].children[0].style.color = "yellow";
}

//* Okay, we're ready to mark things complete. Set up an event listener to run our function. But that event listener needs to run when _any_ `li` is clicked... Where can we add it? When the todo is added to the dom! Add it to the paragraph tags we made for the todo name and date elements, way back where we were printing a todo on the dom.
function reSelect() {
  const lis = document.querySelectorAll("li");
  const lisArray = Array.from(lis);

  lisArray.forEach(li => {
    li.children[0].onclick = function(event) {
      event.target.classList.toggle("lineIt");

      markComplete(lisArray.indexOf(li));
    };
  });
}

//grab all the children of our ol with `.childNodes`, convert it to an array with `Array.from`, and use`indexOf` to find the index of our`li` within that array.

//Now that we've got an index, we can call our helper functions to mark it complete in the data and style it on the dom! (Again, make sure you're correcting for any off - by - one errors.Lists on the dom are 1 - based counting!)

//Now write a function that builds new data * without * the completed ones, then uses our helper function to clear the list, and our helper function to print the list again based on our data(which will now * not * have completed items in it).

function buildNewdata() {
  const newData = [];
  todos.forEach(todo => {
    if (todo[1] === false) {
      newData.push(todo);
    }
  });
  clearDom();
  todos = newData;
  printAllTodosOnDOM(todos);
  reSelect();
}

document.querySelector(".delete-completed-todos").onclick = buildNewdata;
