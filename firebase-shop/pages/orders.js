import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Footer
 from '../components/Footer'
 import useFirebaseAuth, {signOut} from '../firebase/useFirebaseAuth';
 import SignInScreen from "../components/AuthLogin";
 import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row, Col,
  Checkbox,
  Container, Modal
} from '@nextui-org/react';

export default function Orders() {

  const auth = useFirebaseAuth();

  function onFulfilled(result) {
    console.log(result);
  }

  function onRejected(error) {
    console.log("sign out rejected");
    console.log(error.message);
  }

  function signOutNow(){
      auth.signOut().then(onFulfilled, onRejected);
      console.log("trying to sign out");
  }
  
  if(!auth.authUser){
    return(
      <div>
      <SignInScreen title={"Login to see past orders"}/>
    </div>
    )
  }else{
    return(
      <div>
        <Container
      display="flex"
      alignItems="center"
      justify="center"
      css={{ minHeight: '0vh' }}
    >
      <Col  align="center" justify="center">

      <h1 className={styles.title}>Orders</h1>
      <p className={styles.text}>If you can see this page it means you have authenticated successfully</p>

      <Spacer y={3} />
      <Button onPress={signOutNow} shadow color="error" auto>Logout</Button>
      </Col>
      

    </Container>
      

    </div>
    )
  }  

  }
  