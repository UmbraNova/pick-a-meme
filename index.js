import { catsData } from "./data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn")
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById("meme-modal-inner")
const memeModal = document.getElementById("meme-modal")
let radioChecked = false

emotionRadios.addEventListener("change", highlightCheckedOption)

document.addEventListener("click", function(e) {
    if (e.target.id=="meme-modal-close-btn") {
        closeModal()
    }

    // const name for clarity
    const outsideClick = !memeModal.contains(e.target)
    if (outsideClick) {
        closeModal()
    }

    if (e.target.id=="get-image-btn") {
        renderCat()
    }
})

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
    radioChecked = true
    changeButtonColorIfChecked()
}


function closeModal(){
    memeModal.style.display = "none"
}


function renderCat(){
    if (radioChecked) {
        const catObject = getSingleCatObject()
        memeModalInner.innerHTML =  `
        <img 
        class="cat-meme" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
        memeModal.style.display = "flex"
    }
}


function changeButtonColorIfChecked() {
    getImageBtn.style.backgroundColor = "#ff4687"
}


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}


function getMatchingCatsArray(){
    if (document.querySelector("input[type='radio']:checked")) {
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }
}


function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}


function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




