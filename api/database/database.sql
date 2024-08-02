DROP TABLE IF EXISTS diary;


CREATE TABLE diary (
    entry_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entry_date DATE NOT NULL,
    entry_time TIME NOT NULL,
    category VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    title VARCHAR(50) NOT NULL,
    author_name VARCHAR(50) NOT NULL,
    CHECK (entry_date <= CURRENT_DATE)
);


INSERT INTO diary (entry_date, entry_time, category, content, title, author_name) VALUES 
    ('2024-07-26', '09:00:00', 'Personal', 'Started a new diary today. Feeling excited!', 'First Entry', 'Lilia'),
    ('2024-07-27', '10:30:00', 'Work', 'Had a productive meeting with the team.', 'Meeting Recap', 'Mel'),
    ('2024-07-28', '12:15:00', 'Travel', 'Visited the beach and enjoyed a beautiful sunset.', 'Beach Day', 'Lilia'),
    ('2024-07-29', '14:45:00', 'Personal', 'Read a great book on mindfulness.', 'Mindfulness Reading', 'Mel'),
    ('2024-07-30', '16:20:00', 'Fitness', 'Completed a 5K run today!', '5K Run', 'Lilia'),
    ('2024-07-31', '18:00:00', 'Food', 'Cooked a delicious pasta for dinner.', 'Pasta Dinner', 'Mel'),
    ('2024-08-01', '20:10:00', 'Entertainment', 'Watched an amazing movie with friends.', 'Movie Night', 'Lilia'),
    ('2024-08-02', '21:30:00', 'Personal', 'Spent time reflecting on my goals for the year.', 'Goal Reflection', 'Mel');


