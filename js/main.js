import { createTodo, readTodo, updateTodo, deleteTodo } from './response'

const formEl = document.querySelector('form')
const inputEl = formEl.querySelector('input')
const ulEl = document.querySelector('ul')
const dateEl = document.querySelector('.date')

let isEdit = false;

readAndRender()
getDate()

//Todo 입력
formEl.addEventListener('submit',async (e) => {
  e.preventDefault();
  if(inputEl.value.trim().length < 1) return 

  await createTodo(inputEl.value.trim())
  readAndRender()

  inputEl.value = ''
  inputEl.focus()
});

//Todo데이터 재요청,리렌더링
function readAndRender(){
  readTodo().then(res => renderTodo(res))
}

//Todo렌더링
function renderTodo(todos) {
  const liEls = todos.map(todo => {
    const liEl = document.createElement('li')
    const chkInput = document.createElement('input')
    const txtInput = document.createElement('p')
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')
  
    chkInput.setAttribute('type','checkbox')
    editBtn.classList.add('edit')
    delBtn.classList.add('del')

    todo.done ? (
      chkInput.checked = true,
      liEl.classList.add('checked')
      ) : chkInput.checked = false

    txtInput.textContent = todo.title
    editBtn.textContent = '수정'
    delBtn.textContent = '삭제'
    
    liEl.append(chkInput, txtInput, editBtn, delBtn)

    // 체크박스클릭
    chkInput.addEventListener('click',() => {
      if(chkInput.checked){
        liEl.classList.add('checked');
        todo.done = true
      } else {
        liEl.classList.remove('checked');
        todo.done = false
      }
      updateTodo(todo)
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
}

//Todo 내용수정
function editTitle(e, todo) {
  isEdit = true
  
  const origin = todo.title
  const todoInput = e.target.parentElement.children[1]
  todoInput.setAttribute('contenteditable','true')
  todoInput.focus()

  //수정완료
  todoInput.addEventListener('focusout',function(){
    if (isEdit && todoInput.textContent.trim().length > 0 && origin !== todoInput.textContent.trim()) {
      todo.title = todoInput.textContent.trim()
      updateTodo(todo)
      console.log('수정완료')
    }
    if (todoInput.textContent.trim().length < 1){
      todoInput.textContent = origin
    }
    todoInput.removeAttribute('contenteditable')
    isEdit = false;
  })

  todoInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.isComposing) {
      todoInput.blur()
    }
  })  
}

//날짜정보
function getDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  dateEl.textContent = `${year} 년 ${month} 월 ${day} 일`;
};