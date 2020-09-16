const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const myArgs = process.argv.slice(2);

const cohortName = myArgs[0];
const values = [`%${cohortName}%`];

const queryString = `
SELECT DISTINCT(teachers.name) as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;

pool.query(queryString, values).then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));

// pool.query(`
// SELECT DISTINCT(teachers.name) as teacher, cohorts.name as cohort
// FROM assistance_requests
// JOIN teachers ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON students.cohort_id = cohorts.id
// WHERE cohorts.name LIKE '%${myArgs[0]}%'
// ORDER BY teacher;
// `)
// .then(res => {
//   res.rows.forEach(row => {
//     console.log(`${row.cohort}: ${row.teacher}`);
//   })
// }).catch(err => console.error('query error', err.stack));



