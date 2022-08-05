// 유저가 값을 입력한다.
// + 버튼을 클릭하면 할 일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다.
// 1. check 버튼을 클릭하는 순간 true false
// 2. true 이면 끝난 걸로 간주하고 밑줄 보여주기
// 3. false 이면 안끝난 걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면 언더바가 이동한다.
// 끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

/**
 * Question
 * addEventListener VS onclick
 * 바 움직이는건 유튜브 동영상을 확인해라
 */

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event) { filter(event) });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += `
        <div class="task" id="${list[i].id}">
          <div class="task-done">${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
          </div>
        </div>
      `;
    } else {
      resultHTML += `
        <div class="task" id="${list[i].id}">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
          </div>
        </div>
      `;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();  
  console.log(taskList);
}

function filter(event) {
  mode = event.target.id;

  filterList = [];

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }

  console.log(filterList);
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}