import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Footer
 from '../components/Footer'
 import { useUserAuth } from '../firebase/UserAuthContext';
 import { getFirestore, doc, getDocs, query, where, collection, orderBy } from '@firebase/firestore';
 import SignInScreen from "../components/AuthLogin";
 import React, {useRef} from "react";
 import {EmailAuthProvider, reauthenticateWithCredential, getAuth } from 'firebase/auth';

 import {
  Card, Grid,
  Spacer,
  Button,
  Text,
  Input,
  Row, Col,
  Checkbox,
  Container, Modal
} from '@nextui-org/react';

export default function Orders() {

  const {user, logIn, signOut, signUp, deleteUser} = useUserAuth();

  const [visibleDeleteAccount, setVisibleDeleteAccount] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const handlerDeleteAccount = () => setVisibleDeleteAccount(false);

  const closeHandlerDeleteAccount = () => {
    setVisibleDeleteAccount(false);
  };

  const passwordInput = useRef();

    
  // console.log("user data", auth.authUser);
  async function getOrders(){
    const db = getFirestore();
    // console.log("user id: ", user.uid);
    const q = query(collection(db, "orders"), where("user_id", "==", user.uid), orderBy("order_tstamp", "desc"));
    const querySnapshot = await getDocs(q);
    var result = []
    querySnapshot.forEach((doc) => {
      result.push(doc.data)
    });
    return result;
  }

  getOrders().then((result)=>{
    setOrders(result)
  });

  function onFulfilled(result) {
    console.log(result);
  }

  function onRejected(error) {
    console.log("sign out rejected");
    console.log(error.message);
  }

  function signOutNow(){
      signOut().then(onFulfilled, onRejected);
      console.log("trying to sign out");
  }

  function deleteAccount(){
    setVisibleDeleteAccount(true);
  }

  async function finaliseAccountDeletion(){
    let email = user.email;
    let password = passwordInput.current.value;
    try{
      const credential = EmailAuthProvider.credential(
        email,
        password
      );
      console.log("credentials fetched", credential);
      const result = await reauthenticateWithCredential(
          user.currentUser, 
          credential
      ).then((result)=>{
          console.log(" user reauthenticated: ", result);
          deleteUser().then((result)=>{
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
  
  if(!user){
    return(
      <div>
      <SignInScreen title={"Login to see past orders"}/>
    </div>
    )
  }else{
    if(!user.emailVerified){
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
        <Text  size={24} weight="bold" css={{as: 'center', mb: '20px',}}>Orders. Link sent. Email needs to be verified:</Text>
        <Text  size={18}  css={{as: 'center', mb: '20px',}}>{user.email}</Text>
        <Button onPress={signOutNow} shadow color="gradient" auto >Logout</Button>
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
  
        <h1 className={styles.title}>Orders</h1>
        
     
        <p className={styles.text}>If you can see this page it means you have authenticated successfully</p>

        <Grid.Container gap={2} justify="center">
            {orders.map((item, index) => (
              <Grid xs={6} sm={3} key={index}>
                <Card isPressable onClick={() => clickFruit(item)}>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={"https://nextui.org" + item.img}
                      objectFit="cover"
                      width="100%"
                      height={140}
                      alt={item.title}
                    />
                  </Card.Body>
                  <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Row wrap="wrap" justify="space-between" align="center">
                      <Text b>{item.title}</Text>
                      <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                        {item.price}
                      </Text>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            ))}
          </Grid.Container>

  
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
  