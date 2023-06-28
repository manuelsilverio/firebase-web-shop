import React, { useState, useRef, } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase, { auth } from "../firebase/clientApp";
import {createUserWithEmailAndPassword} from "firebase/auth";
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



function SignUpScreen() {

// Modal for error message

  const [visibleError, setVisibleError] = React.useState(false);
  const handlerError = () => setVisibleError(true);

  const closeHandlerError = () => {
    setVisibleError(false);
  };

  // Modal for Sign up error

  const [visibleSignupError, setVisibleSignupError] = React.useState(false);
  const handlerSignupError = () => setVisibleSignupError(true);

  const closeHandlerSignupError = () => {
    setVisibleSignupError(false);
  };

  // Email and Password checkup
  const emailInputSign = useRef();
  const passwordInputSign = useRef();
  const passwordConfirmInputSign = useRef();

  function signup(){
    let email = emailInputSign.current.value;
    let password = passwordInputSign.current.value;
    let passwordConfirm = passwordConfirmInputSign.current.value;

    var canSign = false;
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    function onFulfilled(result) {
      console.log(result);
      console.log("user signed up");
    }
    function onRejected(error) {
      console.log(error.message);
      setVisibleSignupError(true);
    }

    if(password.length> 5 && email.length > 5 && password == passwordConfirm){
      if(re.test(email)){
        console.log("Attempting to login", email, password);
        createUserWithEmailAndPassword(auth, email, password).then(onFulfilled, onRejected); 
      }else{
        setVisibleError(true);
      }
    }else{
      setVisibleError(true);
    }
  }




  return (
    <div>
      <Modal
       closeButton
       aria-labelledby="modal-title"
       open={visibleError}
       onClose={closeHandlerError}>
      <Modal.Header>
          <Text id="modal-title" size={18}>
            Wrong Email or Password
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandlerError}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
       closeButton
       aria-labelledby="modal-title"
       open={visibleSignupError}
       onClose={closeHandlerSignupError}>
      <Modal.Header>
          <Text id="modal-title" size={18}>
            Sign up error
          </Text>
        </Modal.Header>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandlerSignupError}>
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
        <Card variant="bordered" css={{ mw: '420px', p: '20px' }}>
          <Text
            size={24}
            weight="bold"
            css={{
              as: 'center',
              mb: '20px',
            }}
          >
            Sign up
          </Text>
          <Input
            ref={emailInputSign}
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="email"
            placeholder="Email"
          />
          <Spacer y={1} />
          <Input.Password
           ref={passwordInputSign}
            bordered
            fullWidth
            color="primary"
            size="lg"
            type="password"
            placeholder="Password"
          />
          <Spacer y={1} />
          <Input.Password
           ref={passwordConfirmInputSign}
           bordered
           fullWidth
           color="primary"
           size="lg"
           type="password"
           placeholder="Confirm Password"
         />
          <Row justify="space-between" css={{ marginTop: '30px' }}>
            <Checkbox >
              <Text size={14}>Remember me</Text>
            </Checkbox>
          </Row>
          <Spacer y={1} />
          <Button onPress={signup}>Create account</Button>
        </Card>
      </Container>
    </div>
  );
}

export default SignUpScreen;