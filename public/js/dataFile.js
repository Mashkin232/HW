
function makeNote(note_obj){
    let form = document.createElement('form')
    form.action = '/delete'
    form.method = 'post'

    let note=document.createElement('div')
    note.style.marginBottom='20px'

    let noteDate=document.createElement('p')
    noteDate.style.marginBottom='0px'
    noteDate.textContent=`date: ${note_obj.booking_date}`

    let noteTime=document.createElement('p')
    noteTime.style.marginBottom='0px'
    noteTime.textContent=`time: ${note_obj.reservation_time}`

    let comment=document.createElement('p')
    comment.style.marginBottom='0px'
    comment.textContent=`message: ${note_obj.message}`

    let action = document.createElement('button')
    action.type = 'submit'
    action.style = 'background: none; color: #9a9a9a; padding: 3px 5px; display: table; border:2px solid #9a9a9a; margin: 10px 0px 0px 0px ;text-transform: uppercase;font-weight: 600;font-size: 13px;letter-spacing:0.5px;border-radius:0px;'
    action.textContent = "Delete booking"

    let line = document.createElement('hr')

    note.appendChild(form)
    form.appendChild(noteDate)
    form.appendChild(noteTime)
    form.appendChild(comment)

    if(Date.parse(note_obj.booking_date) > Date.now()) {
        action.name = 'click_button'
        action.value = `${note_obj.booking_date} ${note_obj.reservation_time} ${note_obj.message}`

        form.appendChild(action)
    }
    note.appendChild(line)

    return note
}

let note_container=document.querySelector('.visits');

let block=document.createElement('div');

note_container.appendChild(block);

for (let note of data){
    block.appendChild(makeNote(note))
}
