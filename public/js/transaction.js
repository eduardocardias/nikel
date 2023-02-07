let logged = sessionStorage.getItem('logged')
const session = localStorage.getItem('session')
const myModal = new bootstrap.Modal('#transaction-modal')
let data = {
  transaction: [],
}

document.getElementById('button-logout').addEventListener('click', logout)

//adicionar laçamentos

document
  .getElementById('transaction-form')
  .addEventListener('submit', function (e) {
    e.preventDefault()

    const value = parseFloat(document.getElementById('value-input').value)
    const description = document.getElementById('description-input').value
    const date = document.getElementById('date-input').value
    const type = document.querySelector('input[name="type-input"]:checked').value

    data.transaction.unshift({
      value: value,
      type: type,
      description: description,
      date: date,
    })
    saveDate(data)
    e.target.reset()
    myModal.hide()

    gettransaction()

    alert('Lançamento adicionado com sucesso.')
    checkedLogged()
  })


function checkedLogged() {
  if (session) {
    sessionStorage.setItem('logged', session)
    logged = session
  }
  if (!logged) {
    window.location.href = 'index.html'
  }
  const dataUser = localStorage.getItem(logged)
  if (dataUser) {
    data = JSON.parse(dataUser)
  }

  gettransaction()
}

function logout() {
  sessionStorage.removeItem('logged')
  localStorage.removeItem('session')

  window.location.href = 'index.html'
}
function gettransaction() {
  const transaction = data.transaction
  let transactionhtml = ``

  if (transaction.length) {
    transaction.forEach((item) => {
      let type = 'entrada'

      if (item.type === '2') {
        type = 'saida'
      }
      transactionhtml += `

                                    <tr>
                                    <th scope="row">${item.date}</th>
                                    <td>${item.value.tofixed(2)}</td>
                                    <td>${type}</td>
                                    <td>${item.description}</td>
                                  </tr>
           `
    })
  }
  document.getElementById('transaction-list').innerHTML = transactionhtml
}

function saveDate(data) {
  localStorage.setItem(data.login, JSON.stringify(data))
}
