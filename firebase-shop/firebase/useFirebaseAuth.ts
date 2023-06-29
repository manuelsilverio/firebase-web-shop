// Here we create all the hooks for signing in and out the user. Also for retreiving the current user.
import { useState, useEffect } from 'react'
import {auth} from "./clientApp";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  emailVerified: user.emailVerified,
  currentUser: user
});



export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);    
    setLoading(false);
  };

  const signOut = () => auth.signOut().then(clear);
  const deleteUser = () => auth.currentUser?.delete();


// listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signOut, deleteUser
  };
}