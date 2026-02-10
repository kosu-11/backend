const fs = require("fs");
const path = require("path");

const TODO_FILE = path.join(__dirname, "todos.json");


/* ===============================
   FILE HANDLING
================================ */

// read todos (auto create file if missing)
function readTodos() {
  if (!fs.existsSync(TODO_FILE)) {
    fs.writeFileSync(TODO_FILE, "[]");
  }

  const data = fs.readFileSync(TODO_FILE, "utf-8");
  return JSON.parse(data);
}

// write todos
function writeTodos(todos) {
  fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
}


/* ===============================
   FEATURES
================================ */

// ➜ ADD
function addTodo(task) {
  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    task,
    done: false
  };

  todos.push(newTodo);
  writeTodos(todos);

  console.log("✅ Todo added:", task);
}
+

// ➜ LIST
function listTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log("📭 No todos found!");
    return;
  }

  console.log("\n📋 Your Todos:\n");

  todos.forEach((todo, index) => {
    const status = todo.done ? "✅" : "❌";
    console.log(`${index + 1}. ${status}  ${todo.task}   (id: ${todo.id})`);
  });

  console.log("");
}


// ➜ MARK DONE
function markDone(id) {
  const todos = readTodos();

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    console.log("❌ Todo not found!");
    return;
  }

  todo.done = true;
  writeTodos(todos);

  console.log("🎉 Todo marked as done!");
}


// ➜ DELETE
function deleteTodo(id) {
  let todos = readTodos();

  const newTodos = todos.filter(t => t.id !== id);

  if (todos.length === newTodos.length) {
    console.log("❌ Todo not found!");
    return;
  }

  writeTodos(newTodos);

  console.log("🗑️ Todo deleted!");
}



/* ===============================
   CLI COMMANDS
================================ */

const command = process.argv[2];
const value = process.argv.slice(3).join(" ");

switch (command) {
  case "add":
    addTodo(value);
    break;

  case "list":
    listTodos();
    break;

  case "done":
    markDone(Number(value));
    break;

  case "delete":
    deleteTodo(Number(value));
    break;

  default:
    console.log(`
📌 Usage:

node todo.js add "Task name"
node todo.js list
node todo.js done id
node todo.js delete id
`);
}