const headers = {
  'content-type': 'application/json',
  'apikey': 'FcKdtJs202301',
  'username': 'KDT4_JoSeungHye'
}

export async function createTodo(title) {
  await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',{
    method: 'POST',
    headers,
    body : JSON.stringify({
      title
    })
  })
}

export async function readTodo() {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',{
    method: 'GET',
    headers
  })

  const json = await res.json()
  return json
}

export async function updateTodo(todo) {
  //수정에는 해당 데이터의 아이디 필요
  await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,{
    method: 'PUT',
    headers,
    body: JSON.stringify({
      title: todo.title,
      done: todo.done
    })//수정에는 title, done 필수 
  }) //수정api는 수정 된 결과를 반환
}

export async function deleteTodo(todo) {
  await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,{
    method: 'DELETE',
    headers
  })
}