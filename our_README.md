# Personal Diary App

Welcome to the Personal Diary App! This is a simple web application that allows users to create, view, update, and delete diary entries. The app is built using **Express.js** for the backend, **HTML/CSS** for the frontend, and **Supabase** as the database.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Supabase Setup](#supabase-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Create** diary entries with a specific date, time, category, and content.
- **View** a list of all diary entries, sorted by the most recent.
- **View** details of a specific diary entry.
- **Update** the content of existing diary entries.
- **Delete** diary entries.
- **Optional**: Add images to diary entries via URL.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 12.x or higher)
- [npm](https://www.npmjs.com/get-npm)
- A [Supabase](https://supabase.io/) account

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/personal-diary-app.git
    cd personal-diary-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

### Supabase Setup

1. **Create a new project on Supabase**:
   - Go to the [Supabase Dashboard](https://app.supabase.io/) and create a new project.
   - Note down your `Project URL` and `anon` key from the API settings.

2. **Create the diary entries table**:
   - In the Supabase dashboard, go to the SQL editor and run the following SQL command:

    ```sql
    CREATE TABLE IF NOT EXISTS diary_entries (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        entry_date date NOT NULL,
        entry_time time NOT NULL,
        category varchar(50) NOT NULL,
        content text NOT NULL,
        image_url varchar(255),
        created_at timestamp with time zone DEFAULT now(),
        CHECK (entry_date <= current_date)
    );
    ```

3. **Insert sample data (optional)**:
   - Run the following SQL command in the Supabase SQL editor to add some sample diary entries:

    ```sql
    INSERT INTO diary_entries (entry_date, entry_time, category, content, image_url) VALUES 
        ('2024-08-01', '09:00:00', 'Personal', 'Started a new diary today. Feeling excited!', 'https://example.com/images/diary_entry1.jpg'), 
        ('2024-08-02', '10:30:00', 'Work', 'Had a productive meeting with the team.', 'https://example.com/images/diary_entry2.jpg'),
        ('2024-08-03', '12:15:00', 'Travel', 'Visited the beach and enjoyed a beautiful sunset.', 'https://example.com/images/diary_entry3.jpg');
    ```

4. **Configure the Supabase client in your project**:
   - In your project, create a `.env` file in the root directory and add your Supabase credentials:

    ```bash
    SUPABASE_URL=your-project-url
    SUPABASE_ANON_KEY=your-anon-key
    ```

   - Update your project to use the Supabase client. For example, you might have a `supabaseClient.js` file:

    ```javascript
    const { createClient } = require('@supabase/supabase-js');

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    module.exports = supabase;
    ```

### Running the App

1. **Start the server**:
    ```bash
    npm start
    ```

2. **Access the app**:
    - Open your browser and go to `http://localhost:3000`

## Usage

Once the app is running, you can perform the following actions:

- **View all diary entries**: The homepage lists all your entries in reverse chronological order.
- **Add a new entry**: Use the "New Entry" button to create a new diary entry.
- **Edit an entry**: Click on an entry to view its details and use the "Edit" button to update it.
- **Delete an entry**: Click on the "Delete" button to remove an entry.

## API Endpoints

Here’s a list of the main API endpoints:

- `GET /entries`: Fetch all diary entries.
- `POST /entries`: Create a new diary entry.
- `GET /entries/:id`: Fetch details of a specific entry.
- `PUT /entries/:id`: Update a specific entry.
- `DELETE /entries/:id`: Delete a specific entry.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue to discuss any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Enjoy using your Personal Diary App! If you encounter any issues or have suggestions, feel free to reach out.
