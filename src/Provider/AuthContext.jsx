// src/assets/AuthContext.jsx
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [usersAppoitment, setUsersAppointment] = useState();
    const googleProvider = new GoogleAuthProvider();
    const [curehubUser, setCurehubUser] = useState();
    const [allCancelAppointment, setAllCancelAppointment] = useState();
    const [allAppointment, setAllAppointment] = useState();
    const [allTelemedicineAppointment, setAllTelemedicineAppointment] = useState();
    const [allCompleteAppointment, setAllCompleteAppointment] = useState();
    const [telemedicineDoctor, setTelemedicineDoctor] = useState();
    // const navigate = useNavigate();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        // navigate('/');
        return signOut(auth);
    }

    const updateProfileInfo = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    console.log('CureHub user=>', curehubUser);
    useEffect(() => {
        fetch(`https://cure-hub-backend-gules.vercel.app/users/${user?.email}`).then(res => res.json()).then(data => setCurehubUser(data));
    }, [user]);

    useEffect(() => {
        fetch(`https://cure-hub-backend-gules.vercel.app/appoinment/patient/${curehubUser?._id}`).then(res => res.json()).then(data => setUsersAppointment(data));
    }, [curehubUser]);

    useEffect(() => {
        fetch(`https://cure-hub-backend-gules.vercel.app/cancel/getall/appoinment`).then(res => res.json()).then(data => setAllCancelAppointment(data));
    }, []);
    useEffect(() => {
        fetch(`https://cure-hub-backend-gules.vercel.app/appoinment`).then(res => res.json()).then(data => setAllAppointment(data));
    }, []);
    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/telemedicine-appointment').then(res => res.json()).then(data => setAllTelemedicineAppointment(data));
    }, [])
    useEffect(() => {
        fetch('https://cure-hub-backend-gules.vercel.app/complete/getall/appoinment').then(res => res.json()).then(data => setAllCompleteAppointment(data));
    }, [])
    useEffect( () => {
        fetch('https://cure-hub-backend-gules.vercel.app/doctors/telemedicine').then(res => res.json()).then(data => setTelemedicineDoctor(data))
    } ,[])


    console.log('Appointment=========>', usersAppoitment);

    const value = {
        user,
        curehubUser,
        loading,
        usersAppoitment,
        allCancelAppointment,
        allAppointment,
        allTelemedicineAppointment,
        allCompleteAppointment,
        telemedicineDoctor,
        setLoading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateProfileInfo,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
