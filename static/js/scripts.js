

const allButtonTermsTags = document.querySelectorAll(".terms")
const allButtonTags = document.getElementsByTagName("button")
const allOlTags = document.getElementsByTagName("ol")
const allSpanTags = document.getElementsByTagName("span")

const slideValue = document.getElementById("slide-value")

function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

function ink() {
    return `rgba(${randomValue(0, 256)}, ${randomValue(0, 256)}, ${randomValue(0, 256)})`
}

function setClassNameForMultipleTags(queryEl, classNameContent) {
    Array.from(queryEl).forEach(el => {
        el.className = classNameContent
    })
}

function removeClassFrom(tagEl, attribName) {
    tagEl.classList.remove(attribName)
}

function addClassTo(tagEl, attribName) {
    tagEl.classList.add(attribName)
}

function isClassNameOnTag(tagEl, classNameContent) {
    return tagEl.className.split(" ").includes(classNameContent)
}

function watchTagsGroup(tagsGroup) {
    Array.from(tagsGroup).forEach(thisTag => {
        if (thisTag.textContent[0] == "#") {
            thisTag.style.textTransform = "uppercase"
            thisTag.style.letterSpacing = "2px"
            thisTag.style.textDecoration = "italic"
            thisTag.textContent = shortenTxt(thisTag.textContent, 1)
        }
    })
}

function shortenTxt(txt, startingPoint) {
    let shortenedTxt = ""

    for (let i = startingPoint; i < txt.length; i++) {
        shortenedTxt += txt[i]
    }

    return shortenedTxt
}

const moveBackwards = () => {
    // for (let i = slideCounter; i > slideCounter - 1; i--) {
    addClassTo(allOlTags[slideCounter], "hidden")
    allButtonTags[slideCounter].style.backgroundImage = "linear-gradient(to top, #222, #444)"
    // }

    removeClassFrom(allOlTags[slideCounter - 1], "hidden")
    addClassTo(allOlTags[slideCounter - 1], "frame")
    allButtonTags[slideCounter - 1].style.backgroundImage = `linear-gradient(45deg, ${ink()}, ${ink()})`
}

const moveTowards = () => {
    for (let i = 0; i < slideCounter - 1; i++) {
        addClassTo(allOlTags[i], "hidden")
        allButtonTags[i].style.backgroundImage = "linear-gradient(to top, #222, #444)"
    }
    
    removeClassFrom(allOlTags[slideCounter - 1], "hidden")
    addClassTo(allOlTags[slideCounter - 1], "frame")
    allButtonTags[slideCounter - 1].style.backgroundImage = `linear-gradient(45deg, ${ink()}, ${ink()})`
}

setClassNameForMultipleTags(allButtonTags, "btn")
setClassNameForMultipleTags(allOlTags, "txt hidden")

Array.from(allButtonTags).forEach((btnEl, index) => {

    btnEl.addEventListener("click", () => {
        const isTagContentHidden = isClassNameOnTag(allOlTags[index], "hidden")
        
        if (isTagContentHidden) {
            removeClassFrom(allOlTags[index], "hidden")
            addClassTo(allOlTags[index], "frame")
            btnEl.style.backgroundImage = `linear-gradient(45deg, ${ink()}, ${ink()})`
            
        } else {
            addClassTo(allOlTags[index], "hidden")
            removeClassFrom(allOlTags[index], "frame")
            btnEl.style.backgroundImage = "linear-gradient(to top, #222, #444)"
        }
    })
})

watchTagsGroup(allSpanTags)

// Joystick for informations switch (simulate slide)
let slideCounter = 0
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            // returning condition, returning mechanics, html editing to tell which button is used 
            slideCounter > 0 ? slideCounter -= 1 : null
            moveBackwards()
            slideValue.textContent = slideCounter
            break

        case 'd':
            // advancing condition, freezing condition, advancing mechanics, html editing to tell which button is used 
            slideCounter < allButtonTags.length ? slideCounter += 1 : null
            // do not allow the button counter to overpass the value corresponding the correct amount of buttons
            slideCounter == allButtonTags.length ? slideCounter = allButtonTags.length : null
            moveTowards()
            slideValue.textContent = slideCounter
            break
        
        // cancel any button if any other key is pressed
        default:
            for (let i = 0; i < allButtonTags.length; i++) {
                addClassTo(allOlTags[i], "hidden")
                allButtonTags[i].style.backgroundImage = "linear-gradient(to top, #222, #444)"
            }
            slideCounter = 0
            slideValue.textContent = slideCounter
    }
  })
