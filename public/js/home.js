let logged = sessionStorage.getItem('logged')
const session = localStorage.getItem('session')
const myModal = new bootstrap.Modal('#transaction-modal')
let data = {
  transactions: [],
}

document.getElementById('button-logout').addEventListener('click', logout)
document
  .getElementById('transaction-button')
  .addEventListener('click', function () {
    window.location.href = 'transaction.html'
  })

//adicionar laçamentos

document.getElementById('transaction-form').addEventListener('submit', function (e) {
  e.preventDefault()

  const value = parseFloat(document.getElementById('value-input').value)
  const description = document.getElementById('description-input').value
  const date = document.getElementById('date-input').value
  const type = document.querySelector('input[name="type-input"]:checked').value

  data.transactions.unshift({
    value: value,
    type: type,
    description: description,
    date: date,
  })

  saveDate(data)
  e.target.reset()
  myModal.hide()

  getCashIn()
  getCashout()
  gettotal()

  alert('Lançamento adicionado com sucesso.')
})

checkedLogged();

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
  getCashIn()
  getCashout()
  gettotal()
}

function getCashIn() {
  const transactions = data.transactions

  const cashIn = transactions.filter((item) => item.type === '1')
  if (cashIn.length) {
    let cashInhtml = ``
    let limit = 0

    if (cashIn.length > 5) {
      let limit = 5
    } else {
      limit = cashIn.length
    }
    for (let index = 0; index < limit; index++) {
      cashInhtml += `
                                <div class="row mb-4">
                                <div class="col-12">
                                    <h3 class="fs-2">R$ ${cashIn[
          index
        ].value.toFixed(2)}</h3>
                                    <div class="container p-0">
                                      <div class="col-12 col-md-8">
                                       <p> ${cashIn[index].description}</p>
                                      </div>
                                      <div class="col-12 col-md-3 d-flex justify-content-end">
                                        ${cashIn[index].date}

                                      </div>
                                    </div>
                                </div>
                             </div>
      
      `
    }
    document.getElementById('cash-in-list').innerHTML = cashInhtml
  }
}

function getCashout() {
  const transactions = data.transactions

  const cashIn = transactions.filter((item) => item.type === '2')
  if (cashIn.length) {
    let cashInhtml = ``
    let limit = 0

    if (cashIn.length > 5) {
     limit = 5
    } else {
      limit = cashIn.length
    }
    for (let index = 0; index < limit; index++) {
      cashInhtml += `
      <div class="row mb-4">
        <div class="col-12">
          <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
          <div class="container p-0">
            <div class="col-12 col-md-8">
              <p> ${cashIn[index].description}</p>
            </div>
            <div class="col-12 col-md-3 d-flex justify-content-end">
              ${cashIn[index].date}
            </div>
          </div>
        </div>
      </div>
          `
    }
    document.getElementById('cash-out-list').innerHTML = cashInhtml
  }
}

function logout() {
  sessionStorage.removeItem('logged')
  localStorage.removeItem('session')

  window.location.href = 'index.html'
}
function gettotal() {
  const transactions = data.transactions
  let total = 0

  transactions.forEach((item) => {
    if (item.tipe === '1') {
      total += item.value
      total -= item.value
    }
  })
  document.getElementById('total').innerHTML = `R$ ${total.toFixed(2)}`
}

function saveDate(data) {

  localStorage.setItem(data.login, JSON.stringify(data))
}
