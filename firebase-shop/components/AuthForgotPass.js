import useFirebaseAuth from "../firebase/useFirebaseAuth";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import React, { useState, useRef, } from "react";
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


function ForgotPass(){

   

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(false);

  const closeHandler = () => {
    setVisible(false);
  };

  const [visibleError, setVisibleError] = React.useState(false);
  const handlerError = () => setVisibleError(false);

  const closeHandlerError = () => {
    setVisibleError(false);
  };

  const emailInput = useRef();

  const auth = getAuth();
  function onEmailSent(result){
      console.log("email sent", result);
      setVisible(true);
  }
  function onEmailNotSent(error){
      console.log("email not sent", error.message);
      setVisibleError(true);
  }
  function sendPasswordReset(){
    let email = emailInput.current.value;
    const actionCodeSettings = {
        url: process.env.NEXT_PUBLIC_HOME_URL,
        // This must be true.
        handleCodeInApp: true,
        };
    sendPasswordResetEmail(auth, email, actionCodeSettings).then(onEmailSent, onEmailNotSent);
  }

  return (
    <div>

      <Modal
        noPadding 
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}>
        <Modal.Body>
          <Text>Reset link sent successfully</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="success" onPress={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        noPadding 
        closeButton
        aria-labelledby="modal-title"
        open={visibleError}
        onClose={closeHandlerError}>
        <Modal.Body>
          <Text>An error ocurred while Attempting to send reset link</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandlerError}>
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
            Request a password reset
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
          <Button onPress={sendPasswordReset}>Send password reset link</Button>
        </Card>
      </Container>
      </div>
  )


}

export default ForgotPass;