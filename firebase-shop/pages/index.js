
import styles from '../styles/Home.module.css'
import React, {useRef} from "react";
import SignInScreen from "../components/AuthLogin";
import useFirebaseAuth, {signOut, deleteUser} from '../firebase/useFirebaseAuth';
// import { auth } from '../firebase/clientApp';
import {EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

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

    
  // Modal activation for delete account

    const [visibleDeleteAccount, setVisibleDeleteAccount] = React.useState(false);
    const handlerDeleteAccount = () => setVisibleDeleteAccount(false);

    const closeHandlerDeleteAccount = () => {
      setVisibleDeleteAccount(false);
    };

    const passwordInput = useRef();

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

    function deleteAccount(){
      setVisibleDeleteAccount(true);
    }

    async function finaliseAccountDeletion(){
      let email = auth.authUser.email;
      let password = passwordInput.current.value;
      try{
        const credential = EmailAuthProvider.credential(
          email,
          password
        );
        console.log("credentials fetched", credential);
        const result = await reauthenticateWithCredential(
            auth.authUser.currentUser, 
            credential
        ).then((result)=>{
            console.log(" user reauthenticated: ", result);
            auth.deleteUser().then((result)=>{
              console.log("User deleted: ", result);
            }).catch((error)=>{
              console.log("error with user deletion: ", error.message);
              setVisibleDeleteAccount(false);
            }
            );
        }).catch((error)=>{
          console.log("error with user authentication: ", error.message);
          setVisibleDeleteAccount(false);
        }
        );
      }catch{
        console.log("error caught");
        setVisibleDeleteAccount(false);
      }
      
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
            <Card variant="bordered" css={{ mw: '580px', p: '20px' }}>
            <Text  size={24} weight="bold" css={{as: 'center', mb: '20px',}}>Homepage. Link sent. Email needs to be verified:</Text>
            <Text  size={18}  css={{as: 'center', mb: '20px',}}>{auth.authUser.email}</Text>
            </Card>
           
          </Container>
              </div>
          )
          
      }else{
        return(
          <div>

      <Modal
        noPadding 
        closeButton
        aria-labelledby="modal-title"
        open={visibleDeleteAccount}
        onClose={closeHandlerDeleteAccount}>
        <Modal.Body>
          <Card ariant="bordered" css={{ mw: '420px', p: '20px' }}>
          <Text>Enter your password</Text>
          <Input.Password
            ref={passwordInput}
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="password"
            placeholder="Confirm your password"
          />
          <Button onPress={finaliseAccountDeletion} color="error" bordered css={{ marginTop: '10px' }}>Delete Account</Button>

          </Card>
          
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="warning" onPress={closeHandlerDeleteAccount}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            <Container
          display="flex"
          alignItems="center"
          justify="center"
          css={{ minHeight: '0vh' }}
        >
          <Col  align="center" justify="center">
  
          <h1 className={styles.title}>Authenticated homepage</h1>
          <p className={styles.text}>If you can see this page it means you have authenticated successfully</p>
  
          <Spacer y={3} />
          <Button onPress={signOutNow} shadow color="secondary">Logout</Button>
          <Spacer y={1} />
          <Button onPress={deleteAccount} shadow color="error" >Delete Account</Button>
          </Col>
          
  
        </Container>
          
  
        </div>
        )
      }
      
    }

    
    

}
