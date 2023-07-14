import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut, deleteUser,
  } from "firebase/auth";
import {auth} from "./clientApp";

const userAuthContext = createContext();

export function UserAuthContextProvider({children}){
    const [user, setUser] = useState({});

    function logIn(email, password) {
      return signInWithEmailAndPassword(auth, email, password);
    }
    function signUp(email, password) {
      return createUserWithEmailAndPassword(auth, email, password);
    }
    const signOut = () => auth.signOut();
    const deleteUser = () => auth.currentUser?.delete();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        console.log("Auth", currentuser);
        setUser(currentuser);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    return (
      <userAuthContext.Provider
        value={{ user, logIn, signUp, signOut, deleteUser }}
      >
        {children}
      </userAuthContext.Provider>
    );
  }
  
  export function useUserAuth() {
    return useContext(userAuthContext);
  }