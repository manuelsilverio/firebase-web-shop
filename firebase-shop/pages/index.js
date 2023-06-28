// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import Link from 'next/link';
import React from "react";
import Auth from "../components/Auth";

// import { initializeApp } from 'firebase/app';
// import firebase from "../firebase/clientApp";
// import {auth} from "../firebase/clientApp";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollection } from "react-firebase-hooks/firestore";
// import {signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
// import { useEffect, useState } from 'react';
import useFirebaseAuth from '../firebase/useFirebaseAuth';
import {signOut} from "firebase/auth";
// import { auth } from "../firebase/clientApp";
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

    function signoutNow(){
      // signOut(auth)
      // auth.signOut().then(onFulfilled);
      auth.authUser.signOut();
    }

    if(!auth.authUser){
      return(
        <div>
        <Auth/>
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
        <Button onPress={signoutNow} shadow color="error" auto>Logout</Button>
        </Col>
        

      </Container>
        

      </div>
      )
    }

    
    

}
