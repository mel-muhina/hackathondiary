const diaryEntriesButton = document.querySelector("#loadDiaryEntries");
const diaryEntries = document.querySelector("#diaryEntries");

const getDiary = (e) => {
    e.preventDefault() // Prevents the page from auto refreshing when submit is pressed
    console.log("Pressing diary button")
    getDiaryEntries()
}

//Event listener that loads all the diary entries up
diaryEntriesButton.addEventListener("click", getDiary);


// Function to get all diary entries, currently not using the parameter id as I'm working on showing all entries first

async function getDiaryEntries(id) {
    try {
    const response = await fetch(`https://hackathondiary.onrender.com/diary`)
    
    if (response.ok) {
        const data = await response.json() 

        // I broke them down within the function just to test if they work individually 

        // const authorName = data[0].author_name
        // const category = data[0].category
        // const title =  data[0].title
        // const content = data[0].content
        // const entry_date = data[0].entry_date

        addEntry(data[0]) // Sending the entries data to the addEntry function 
      
    } else {
        throw "Error: http status code = " + response.status
    } 
 }
catch (err) {
    console.log(err)
    }
}

// Creating new elements every time the button is pressed to show all the entries under the button
// Currently I have only used the first data in the database, it needs to be mapped to show all

const addEntry = (data) => {
    const { author_name, category, title, content, entry_date } = data
    console.log("addEntry function", data)

    const h3 = document.createElement("h3")
    const h4 = document.createElement("h4")
    const date = document.createElement("h4")
    const postContent = document.createElement("p")

    h3.innerHTML = `Author: ${author_name}`
    h4.innerHTML = `Category: ${category}`
    date.innerHTML = `Date: ${entry_date}`
    postContent.innerHTML = `Content: ${content}`
  
   
    diaryEntries.appendChild(h3) 
    diaryEntries.appendChild(h4) 
    diaryEntries.appendChild(date) 
    diaryEntries.appendChild(postContent) 

     
}

