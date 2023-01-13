  /* ------------------------
            FILTER
  --------------------------*/
// Constante pour les filters
  const filter1 = document.querySelector('#one')
  const filter1act = document.querySelector('#one_active')
  const filter2 = document.querySelector('#two')
  const filter2act = document.querySelector('#two_active')
  const filter3 = document.querySelector('#three')
  const filter3act = document.querySelector('#three_active')

  const btnFilter1 = document.querySelector('#btn_one')
  const btnFilter1act = document.querySelector('#btn_one__act')
  const btnFilter2 = document.querySelector('#btn_two')
  const btnFilter2act = document.querySelector('#btn_two__act')
  const btnFilter3 = document.querySelector('#btn_three')
  const btnFilter3act = document.querySelector('#btn_three__act')


//OUVRE LA LISTE FILTRE 1
  btnFilter1.addEventListener("click",  function showOneAct(event) {

    event.preventDefault()
    filter1.classList.add('hidden')
    filter1act.classList.remove('hidden')

  })
//FERMER LA LISTE FILTRE 1
  btnFilter1act.addEventListener("click",  function showOne(event) {

    event.preventDefault()
    filter1act.classList.add('hidden')
    filter1.classList.remove('hidden')

  })

//OUVRE LA LISTE FILTRE 2
  btnFilter2.addEventListener("click",  function showTwoAct(event) {

    event.preventDefault()
    filter2.classList.add('hidden')
    filter2act.classList.remove('hidden')

  })
//FERMER LA LISTE FILTRE 1
  btnFilter2act.addEventListener("click",  function showOne(event) {

    event.preventDefault()
    filter2act.classList.add('hidden')
    filter2.classList.remove('hidden')

  })

  //OUVRE LA LISTE FILTRE 3
  btnFilter3.addEventListener("click",  function showThreeAct(event) {

    event.preventDefault()
    filter3.classList.add('hidden')
    filter3act.classList.remove('hidden')

  })
//FERMER LA LISTE FILTRE 1
  btnFilter3act.addEventListener("click",  function showThree(event) {

    event.preventDefault()
    filter3act.classList.add('hidden')
    filter3.classList.remove('hidden')

  })