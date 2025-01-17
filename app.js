let input = document.getElementById('input')
let text = document.getElementById('text')
let btn = document.getElementById('tryagain')
let mistakeTag = document.getElementById('mistakes')
let timeTag = document.getElementById('time')
let accuracyTag = document.getElementById('acc')
let wpmTag = document.getElementById('wpm')
let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0
let wpm = accuracy = acc = 0

function randomParagraph() {
  let randomPara = Math.floor(Math.random() * paragraphs.length)
  text.innerHTML = ''; 
  paragraphs[randomPara].split('').forEach(span => {
    let spanTag = `<span>${span}</span>`
    text.innerHTML += spanTag
  })

}
function initType() {
    let character = text.querySelectorAll('span')
    let typedChar = input.value.split('')[charIndex]

    if(charIndex < character.length - 1 && timeLeft > 0) {
      if(!isTyping) {
        timer = setInterval(initTimer, 1000)
        isTyping = true
      }

      if(typedChar == null) {

        if (charIndex > 0) charIndex--
        if(character[charIndex]?.classList.contains('incorrect')) {
          mistakes--
        }
        character[charIndex].classList.remove('correct', 'incorrect')
      } else {
        if(character[charIndex].innerText === typedChar) {
          character[charIndex].classList.add('correct')
        } else {
          mistakes++
          character[charIndex].classList.add('incorrect')
        }
        charIndex++
        
      }
       wpm = (charIndex - mistakes) / 5 / ((maxTime - timeLeft) / 60 )  
     
     accuracy = charIndex === 0 ? 100 : ((charIndex - mistakes) / charIndex) * 100;
       acc = accuracy < 0 ? 0 : accuracy

      wpm  = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
      wpmTag.innerHTML = `wpm: ${wpm.toFixed(0)}`
      accuracyTag.innerHTML = `Accuracy: ${acc.toFixed(0)}%`
      mistakeTag.innerHTML = `Mistakes: <span class="red">${mistakes}</span>`
    } else {
      input.value = ''
      clearInterval(timer)
    }
    
  

}
function initTimer () {
  if(timeLeft > 0) {
    timeLeft--
    timeTag.innerHTML = `${timeLeft}s`
  } else {
    clearInterval(timer)
  }
}
input.addEventListener('input', initType)
randomParagraph()

btn.addEventListener('click', function () {
  input.value = ''
  clearInterval(timer)
  
    
    randomParagraph()
  
  isTyping = false
  wpm = 0 
  accuracy = 0
  acc = 0
  maxTime = 60
  charIndex = 0
  mistakes = 0
  timeLeft = maxTime
  wpmTag.innerHTML = `wpm: 0`
  accuracyTag.innerHTML = `Accuracy: 0%`
  mistakeTag.innerHTML = `Mistakes: <span class="red">0</span>`
  timeTag.innerHTML = `${maxTime}s`
  
})