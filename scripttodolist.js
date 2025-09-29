const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// ajouter une tâche
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="doneBtn">✔</button>
      <button class="deleteBtn">✖</button>
    </div>
  `;

  // bouton done
  li.querySelector('.doneBtn').addEventListener('click', () => {
    li.querySelector('span').classList.toggle('completed');
  });

  // bouton delete
  li.querySelector('.deleteBtn').addEventListener('click', () => {
    taskList.removeChild(li);
  });

  taskList.appendChild(li);
  taskInput.value = "";
});
