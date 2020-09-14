SELECT students.name AS student, SUM(assignment_submissions.duration) / COUNT(*) AS average_assignment_duration, SUM(assignments.duration) / COUNT(assignments.id) AS average_estimated_duration
FROM assignment_submissions
JOIN students ON student_id = students.id
JOIN assignments ON assignment_id = assignments.id
WHERE students.end_date IS NULL
GROUP BY students.name
HAVING SUM(assignment_submissions.duration) / COUNT(*) < SUM(assignments.duration) / COUNT(assignments.id)
ORDER BY average_assignment_duration;