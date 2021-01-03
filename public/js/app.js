//console.log('Client side js')

const weatherForm=document.querySelector('form')
const search =document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')
const messageFour=document.querySelector('#message-4')
const messageFive=document.querySelector('#message-5')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent="Loading..."
    messageTwo.textContent=""
    messageThree.textContent=""
    messageFour.textContent=""
    messageFive.textContent=""
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if (!data.message){
            messageOne.textContent='Address : '+data.address
            messageTwo.textContent=`Temperature : ${data.temperature}F`
            messageThree.textContent='Forecast: '+data.forecast
            messageFour.textContent='Temp_min:'+data.temp_min
            messageFive.textContent='Temp_max:'+data.temp_max
        }
        else{
            messageOne.textContent=data.message
        }
    })
})
})
