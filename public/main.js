var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
var nuevoname = document.getElementById("nuevoname").value;
  fetch('clientes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'Nombre': nuevoname,
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
  })

  fetch('clientes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'Nombre': 'nuevoname'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})