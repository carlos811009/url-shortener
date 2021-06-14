const result = document.querySelector('.result_container')
const short_url = document.querySelector('.short')
if (result) {
  result.addEventListener('click', event => {
    const target = event.target
    if (target.id === "copyBtn") {
      short_url.select()
      document.execCommand("Copy")
      alert('複製成功')
      return
    }
  })
}