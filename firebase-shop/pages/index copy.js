
import styles from '../styles/Home.module.css'
import React, {useRef} from "react";
import SignInScreen from "../components/AuthLogin";
import useFirebaseAuth, {signOut, deleteUser} from '../firebase/useFirebaseAuth';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import { useUserAuth } from '../firebase/UserAuthContext';
// import { auth } from '../firebase/clientApp';
import {EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { v4 as uuid } from 'uuid';

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


  export default function Home() {
    // const [user, setUser] = useState(null)
    // const onAuthStateChanged = async (authState)=>{
    //   if(!authState){
    //     setUser(authState)
    //   }
    // };

    const list = [
      {
        title: "Orange",
        img: "/images/fruit-1.jpeg",
        price: "£5.50",
        price_cents: 550,
      },
      {
        title: "Tangerine",
        img: "/images/fruit-2.jpeg",
        price: "£3.00",
        price_cents: 300
      },
      {
        title: "Cherry",
        img: "/images/fruit-3.jpeg",
        price: "£10.00",
        price_cents: 1000
      },
    ];
    
  // Modal activation for delete account

    const [visibleDeleteAccount, setVisibleDeleteAccount] = React.useState(false);
    const [visibleConfirmPurchase, setVisibleConfirmPurchase] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(list[0]);
    const handlerConfirmPurchase = () => setVisibleConfirmPurchase(false);
    const handlerDeleteAccount = () => setVisibleDeleteAccount(false);

    const closeHandlerDeleteAccount = () => {
      setVisibleDeleteAccount(false);
    };
    const closeHandlerConfirmPurchase = () => {
      setVisibleConfirmPurchase(false);
    };

    const passwordInput = useRef();

    // const auth = useFirebaseAuth();
    const {user} = useUserAuth();

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

    function clickFruit(item){
      console.log("Fruit clicked", item);
      setSelectedItem(item);
      setVisibleConfirmPurchase(true);
    }

    async function confirmPurchase(){
      console.log("purchase confirmed", selectedItem);
      setVisibleConfirmPurchase(false);
      const db = getFirestore();
      const order_id = uuid()
      const orderRef = doc(db, "orders", order_id.toString())
      const orderItem = {
        user_id: auth.authUser.uid, 
        id: order_id.toString(), 
        item_name: selectedItem.title, 
        price: selectedItem.price, 
        price_cents: selectedItem.price_cents, 
        order_tstamp: new Date()
       };
      await setDoc(orderRef, orderItem);
      console.log("order saved");
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

      <Modal
        noPadding 
        closeButton
        aria-labelledby="modal-title"
        open={visibleConfirmPurchase}
        onClose={closeHandlerConfirmPurchase}>
        <Modal.Body>
          <Card ariant="bordered" css={{ mw: '420px', p: '20px' }}>
          <Text>Confirm your purchase of {selectedItem.title} for {selectedItem.price}</Text>
         
          <Button onPress={confirmPurchase} color="success" bordered css={{ marginTop: '10px' }}>Confirm purchase</Button>

          </Card>
          
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="warning" onPress={closeHandlerConfirmPurchase}>
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
          <p className={styles.text}>Purchase your favourite fruit:</p>

          <Spacer y={1} />
          <Grid.Container gap={2} justify="center">
            {list.map((item, index) => (
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
