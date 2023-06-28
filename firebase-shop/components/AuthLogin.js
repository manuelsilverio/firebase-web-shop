import React, { useState, useRef, } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase, { auth } from "../firebase/clientApp";
import SignUpScreen from "./AuthSignUp";
import {signInWithEmailAndPassword} from "firebase/auth";
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container, Modal
} from '@nextui-org/react';



function SignInScreen({title}) {

  // Modal for error message

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };

  // Modal for Login error

  const [visibleLoginError, setVisibleLoginError] = React.useState(false);
  const handlerLoginError = () => setVisibleLoginError(true);

  const closeHandlerLoginError = () => {
    setVisibleLoginError(false);
  };

  // Modal for Sign up
  const [visibleSignup, setVisibleSignup] = React.useState(false);
  const handlerSignup = () => setVisibleSignup(true);

  const closeHandlerSignup = () => {
    setVisibleSignup(false);
  };

  // Email and Password checkup
  const emailInput = useRef();
  const passwordInput = useRef();

  async function login() {  
    let email = emailInput.current.value;
    let password = passwordInput.current.value;
    var canSign = false;
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    function onFulfilled(result) {
      console.log(result);
      // Success will be printed
    }
    function onRejected(error) {
      console.log(error.message);
      setVisibleLoginError(true);
    }

    if(password.length> 5 && email.length > 5){
      if(re.test(email)){
        console.log("Attempting to login", email, password);
        signInWithEmailAndPassword(auth, email, password).then(onFulfilled, onRejected); 
      }else{
        setVisible(true);
      }
    }else{
      setVisible(true);
    }
  }
  
  function changeToSignup(){
    console.log("changing view to sign up view");
    setVisibleSignup(true);
  }

  


  return (
    <div>

      <Modal
      noPadding 
       closeButton
       aria-labelledby="modal-title"
       open={visibleSignup}
       onClose={closeHandlerSignup}>
        <Modal.Body>
          <SignUpScreen/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandlerSignup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
       closeButton
       aria-labelledby="modal-title"
       open={visible}
       onClose={closeHandler}>
      <Modal.Header>
          <Text id="modal-title" size={18}>
            Wrong Email or Password
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
       closeButton
       aria-labelledby="modal-title"
       open={visibleLoginError}
       onClose={closeHandlerLoginError}>
      <Modal.Header>
          <Text id="modal-title" size={18}>
            User not found
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandlerLoginError}>
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
        <Card css={{ mw: '420px', p: '20px' }}>
          <Text
            size={24}
            weight="bold"
            css={{
              as: 'center',
              mb: '20px',
            }}
          >
            {title}
          </Text>
          <Input
            ref={emailInput}
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="email"
            placeholder="Email"
          />
          <Spacer y={1} />
          <Input.Password
            ref={passwordInput}
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="password"
            placeholder="Password"
          />
          <Row justify="space-between" css={{ marginTop: '30px' }}>
            <Checkbox >
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14} >Forgot password?</Text>
          </Row>
          <Spacer y={1} />
          <Button onPress={login}>Sign in</Button>
          <Spacer y={1} />
          <Text size={14} css={{ as: 'center' }}>Can't login?</Text>
          <Button onPress={changeToSignup} color="warning" bordered css={{ marginTop: '10px' }}>Create new account</Button>
        </Card>
      </Container>
    </div>
  );
}

export default SignInScreen;