
import styles from '../styles/Home.module.css'
import React from "react";
import SignInScreen from "../components/AuthLogin";
import useFirebaseAuth, {signOut} from '../firebase/useFirebaseAuth';

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

  export default function Home() {
    // const [user, setUser] = useState(null)
    // const onAuthStateChanged = async (authState)=>{
    //   if(!authState){
    //     setUser(authState)
    //   }
    // };

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
        <SignInScreen title={"Login to see products"}/>
      </div>
      )
    }else{
      if(!auth.authUser.emailVerified){
        console.log("email needs to be verified");
          return(
            <div>
              <Container
            display="flex"
            alignItems="center"
            justify="center"
            css={{ minHeight: '0vh' }}
          >
            <Card variant="bordered" css={{ mw: '420px', p: '20px' }}>
            <Text  size={24} weight="bold" css={{as: 'center', mb: '20px',}}>Link sent. Email needs to be verified:</Text>
            <Text  size={18}  css={{as: 'center', mb: '20px',}}>{auth.authUser.email}</Text>
            </Card>
           
          </Container>
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
  
          <h1 className={styles.title}>Authentication homepage</h1>
          <p className={styles.text}>If you can see this page it means you have authenticated successfully</p>
  
          <Spacer y={3} />
          <Button onPress={signOutNow} shadow color="error" auto>Logout</Button>
          </Col>
          
  
        </Container>
          
  
        </div>
        )
      }
      
    }

    
    

}
