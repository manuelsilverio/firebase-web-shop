import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Footer
 from '../components/Footer'
export default function About() {
    return (
      <div className={styles.container}>


        <h1>About page</h1>
  
        <p>This website is used as a case study for Firebase Authentication and Data pipeline for data visualisation. Users can sign up or login and make fake/test orders. Orders can only be made while signed in.</p>
        <p>Test orders are stored in Firestore which are then transfered to BigQuery. Then we use Dataform to perform SQL transformations on the data. Ultimately the transformed data is accessed and visualised from Looker Studio.</p>
      </div>
    )
  }
  