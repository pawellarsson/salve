import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import clinicsPath from '../csv/clinics.csv';
import patientsOnePath from '../csv/patients-1.csv';
import patientsTwoPath from '../csv/patients-2.csv';

/**
 *  Hey whom ever is reading this :)
 *
 *  If we start with backend, reading the CSV files, I used webpack for it, please check next.config.js file.
 *  It's not what I would normally do but instead have a call to backend API with AUTH to get the data
 *  but since I'm not a fullstack, I found this solution the easiest to do.
 *
 *  Another thing to add, is that all the code (I mean JS) is in just one file. Normally this would be cut down to
 *  individual files as much as possible if it makes sense, example, the 'sortTableData' function can be reused and
 *  can be put in a 'helper' folder with other functionality.
 *
 *  I used the NextJS app tol start off, reason for it is that I have used NextJS and React for quite some time.
 *
 *  Styling I didn't care much about, I've reused what was already there from the start. The data might have been
 *  better to have in a table but than again I'm not a designer :)
 *
 *  The rest should be easy to understand,
 *  there's two hooks, one string and one array plus a variable,
 *  another hook on further down, useEffect that only runs once during the first render as it's missing dependencies.
 *
 *  Best
 *  Pawel
 */

const Home = () => {
  const [direction, setDirection] = useState('ascending');
  const [patients, setPatients] = useState([]);
  let patientsSorted = patientsOnePath;

  /**
   * Handle change from dropdown and set the 'patient' hook
   *
   * @param id {string} The string id from clinics
   */
  const handleChange = id => {
    if (id === '1') setPatients(patientsOnePath);
    else setPatients(patientsTwoPath);
  };

  /**
   * Sort the array based on value and direction
   *
   * @param array {array} Array of the current patients that are been displayed
   * @param sortBy {string} A string based on the name the user want to sort by
   * @param direction {string} A string of either 'ascending' or 'descending'
   */
  const sortTableData = (array, { sortBy, direction }) => {
    return array.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return direction === 'ascending' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return direction === 'ascending' ? 1 : -1;
      return 0;
    })
  };

  /**
   * Handle click from span elements when user want to sort
   *
   * @param event
   */
  const handleClick = event => {
    const sortDir = direction === 'descending' ? 'ascending' : 'descending';
    setDirection(sortDir);

    const sortConfig = { sortBy: event.target.id, direction: sortDir };
    patientsSorted = sortTableData(patients, sortConfig);
    setPatients(patientsSorted);
  };

  useEffect(() => {
    setPatients(patientsOnePath);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to Salve
        </h1>

        <p className={styles.description}>
          <select onChange={e => handleChange(e.target.value)}>
            {clinicsPath && clinicsPath?.map(clinic => {
              return (
                <option value={clinic.id} key={clinic.id}>{clinic.name}</option>
              )
            })}
          </select>
        </p>

        <div className={styles.grid}>
          {patients?.map(patient => {
            return (
              <div className={styles.card} key={patient.id}>
                <span onClick={e => handleClick(e)} id="id" key="id">
                  {`ID: ${patient.id}`}
                </span>
                <span onClick={e => handleClick(e)} id="clinic_id" key="clinic_id">
                  {`Clinic ID: ${patient.clinic_id}`}
                </span>
                <span onClick={e => handleClick(e)} id="first_name" key="first_name">
                  {`First name: ${patient.first_name}`}
                </span>
                <span onClick={e => handleClick(e)} id="last_name" key="last_name">
                  {`Last name: ${patient.last_name}`}
                </span>
                <span onClick={e => handleClick(e)} id="date_of_birth" key="date_of_birth">
                  {`Date of birth: ${patient.date_of_birth}`}
                </span>
              </div>
            )
          })}
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home;
