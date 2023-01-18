import { createTodo, readTodo, updateTodo, deleteTodo } from './response'

const dateEl = document.querySelector('.date')
const formEl = document.querySelector('form')
const inputEl = formEl.querySelector('input')
const ulEl = document.querySelector('ul')
const delAllEl = document.querySelector('.options > button')
const noTodoEl = document.querySelector('.no-todo')
const loadingEl = document.querySelector('.loading')
const selectEl = document.getElementById('view-options')

let isEdit = false;

readAndRender()
getDate()

//Todo 입력
formEl.addEventListener('submit',async (e) => {
  e.preventDefault();
  if(inputEl.value.trim().length < 1) return 

  await createTodo(inputEl.value.trim())
  if(selectEl.value === 'done') {selectEl.value = 'all'}
  readAndRender()

  inputEl.value = ''
  inputEl.focus()
});

// 데이터 전체삭제
delAllEl.addEventListener('click', async () => {
  const todos = await readTodo()
  if(confirm('정말로 일정을 모두 삭제하시겠습니까?')){
    todos.map((todo) => {
      deleteTodo(todo)
    })
    renderTodo([])
  }
})

// 일정 추가 버튼
noTodoEl.addEventListener('click',() => {
  inputEl.focus()
})

//보기 설정
selectEl.addEventListener('change', () => {
  readAndRender()
})

//Todo데이터 재요청,리렌더링
function readAndRender(){
  loadingEl.style.display = 'block'
  readTodo().then(todos => renderTodo(todos))
}

//Todo렌더링
function renderTodo(todos) {
  // 저장된 일정이 없을 때
  if(todos.length === 0) { 
    ulEl.innerHTML = ''
    delAllEl.style.display = 'none'
    loadingEl.style.display = 'none'
    noTodoEl.style.display = 'block'
    return
  }

  delAllEl.style.display = 'block'
  noTodoEl.style.display = 'none'

  if(selectEl.value === 'yet') {
    //미완료일정
    todos = todos.filter(todo => !todo.done)
  } else if (selectEl.value === 'done') {
    //완료일정
    todos = todos.filter(todo => todo.done)
  }

  const liEls = todos.map(todo => {
    const liEl = document.createElement('li')
    const chkInput = document.createElement('input')
    const txtInput = document.createElement('p')
    const divEl = document.createElement('div')
    const createDateEl = document.createElement('span')
    const editDateEl = document.createElement('span')
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')
  
    chkInput.setAttribute('type','checkbox')
    editBtn.classList.add('edit')
    delBtn.classList.add('del')

    todo.done ? ( // 인풋 체크여부 확인
      chkInput.checked = true,
      liEl.classList.add('checked')
      ) : chkInput.checked = false

    txtInput.textContent = todo.title
    createDateEl.textContent = `created ${todo.createdAt.slice(2,10)}`
    editDateEl.textContent = `updated ${todo.updatedAt.slice(2,10)}`
    editBtn.textContent = '수정'
    delBtn.textContent = '삭제'
    
    divEl.append(createDateEl, editDateEl)
    liEl.append(chkInput, txtInput, divEl, editBtn, delBtn)

    // 체크박스클릭
    chkInput.addEventListener('click',() => {
      todoCheck(liEl, chkInput, todo)
    })

    // 수정버튼클릭
    editBtn.addEventListener('click', (e) => {
      editTitle(e,todo)
    });

    // 삭제버튼클릭
    delBtn.addEventListener('click', async () => {
      await deleteTodo(todo)
      readAndRender()
    });

    return liEl
  });

  ulEl.innerHTML = ''
  ulEl.append(...liEls)
  loadingEl.style.display = 'none'
  delAllEl.style.display = 'block'
}

//Todo 내용수정
function editTitle(e, todo) {
  isEdit = true
  
  const origin = todo.title
  const todoInput = e.target.parentElement.children[1]
  todoInput.setAttribute('contenteditable','true')
  todoInput.focus()

  //수정완료
  todoInput.addEventListener('focusout',async () => {
    if (isEdit && todoInput.textContent.trim().length > 0 && origin !== todoInput.textContent.trim()) {
      todo.title = todoInput.textContent.trim()
      await updateTodo(todo)
    }
    if (todoInput.textContent.trim().length < 1){
      todoInput.textContent = origin
    }
    todoInput.removeAttribute('contenteditable')
    isEdit = false;

    readAndRender()
  })
  //엔터키로 수정완료
  todoInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.isComposing) {
      todoInput.blur()
    }
  })  
}

// 할 일 완료여부 수정
async function todoCheck (liEl, chkInput, todo) {
  if(chkInput.checked){
    liEl.classList.add('checked');
    todo.done = true
  } else {
    liEl.classList.remove('checked');
    todo.done = false
  }

  await updateTodo(todo)
  readAndRender()
}

//날짜정보
function getDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  dateEl.textContent = `${year} 년 ${month} 월 ${day} 일`;
};