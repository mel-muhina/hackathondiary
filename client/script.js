document.addEventListener("DOMContentLoaded", () => {
    const createDiaryForm = document.getElementById('createDiaryForm');
    const loadDiaryEntriesButton = document.getElementById('loadDiaryEntries');
    const diaryEntriesDiv = document.getElementById('diaryEntries');


    createDiaryForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(createDiaryForm);
        const data = {
            entry_date: formData.get('entry_date'),
            entry_time: formData.get('entry_time'),
            category: formData.get('category'),
            content: formData.get('content'),
            authorId: parseInt(formData.get('authorId')),
        };

        try {
            const response = await fetch('/api/diary', {  // Update API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to create diary entry');
            }

            const result = await response.json();
            alert('Diary entry created successfully');
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Load and display diary entries
    loadDiaryEntriesButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/diary');  // Update API endpoint

            if (!response.ok) {
                throw new Error('Failed to load diary entries');
            }

            const entries = await response.json();
            diaryEntriesDiv.innerHTML = entries.map(entry => `
                <div>
                    <h3>Entry ID: ${entry.entry_id}</h3>
                    <p>Date: ${entry.entry_date}</p>
                    <p>Time: ${entry.entry_time}</p>
                    <p>Category: ${entry.category}</p>
                    <p>Content: ${entry.content}</p>
                    <p>Author ID: ${entry.authorId}</p>
                </div>
                <hr>
            `).join('');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
