import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])
  
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  
  function logout() {
    return auth.signOut()
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  } 
  
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

