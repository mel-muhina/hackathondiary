const diaryEntriesButton = document.querySelector("#loadDiaryEntries");
const diaryEntries = document.querySelector("#diaryEntries");

const getDiary = (e) => {
    e.preventDefault();
    console.log("Loading diary entries...");
    getDiaryEntries();
}

diaryEntriesButton.addEventListener("click", getDiary);

async function getDiaryEntries() {
    try {
        const response = await fetch(`https://hackathondiary.onrender.com/diary`);
        
        if (response.ok) {
            const data = await response.json();
            diaryEntries.innerHTML = ''; // Clear previous entries
            data.forEach(entry => addEntry(entry)); // Map over all entries
        } else {
            throw new Error("Error: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
}

const addEntry = (data) => {
    const { author_name, category, title, content, entry_date } = data;

    const entryDiv = document.createElement("div");

    const authorElement = document.createElement("h3");
    authorElement.textContent = `Author: ${author_name}`;

    const categoryElement = document.createElement("h4");
    categoryElement.textContent = `Category: ${category}`;

    const dateElement = document.createElement("h4");
    dateElement.textContent = `Date: ${entry_date}`;

    const contentElement = document.createElement("p");
    contentElement.textContent = `Content: ${content}`;

    entryDiv.appendChild(authorElement);
    entryDiv.appendChild(categoryElement);
    entryDiv.appendChild(dateElement);
    entryDiv.appendChild(contentElement);

    diaryEntries.appendChild(entryDiv);
}
