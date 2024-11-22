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

    const [allUsers, setAllUsers] = useState();
    const [allDoctors, setAllDoctors] = useState();
    const [allMessage, setAllMessage] = useState();
    const [allMedicine, setAllMedicine] = useState();
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


    const getAllUsers = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/users');
            const data = await response.json(); 
            const users = data?.filter((item) => item?.role !== 'doctor');
            setAllUsers(users);

        } catch (error) {
            console.error('Error fetching users:', error);
            return null; // Return null or handle error as needed
        }
    };

    const getAllDoctors = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/doctors');
            const data = await response.json(); 
            setAllDoctors(data);

        } catch (error) {
            console.error('Error fetching users:', error);
            return null; // Return null or handle error as needed
        }
    };

    const getAllMessages = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/contact-us');
            if (response.ok) {
                const data = await response.json();
                setAllMessage(data?.reverse());
            } else {
                console.error("Failed to fetch messages. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };
   
    const getAllMedicine = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/medicine');
            const data = await response.json(); // Parse the JSON response
            const reversedData = data.reverse(); // Reverse the data correctly
            setAllMedicine(reversedData); // Set the reversed data in state
            console.log('Reversed Data:', reversedData); // Log the reversed data
        } catch (error) {
            console.error("Error fetching medicine data:", error);
        }
    };


    const getAllTelemedicineAppintment = async () => {
        try {
            const response = await fetch('https://cure-hub-backend-gules.vercel.app/telemedicine-appointment');
        } catch (error) {
            console.error("Error fetching medicine data:", error);
        }
    };
    

    useEffect( () => {
        getAllUsers();
        getAllDoctors();
        getAllMessages();
        getAllMedicine();
        getAllTelemedicineAppintment();
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
        allUsers,
        allDoctors,
        allMessage,
        allMedicine,
        setAllUsers,
        setAllDoctors,
        setAllMessage,
        setAllMedicine,
        setLoading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateProfileInfo,
        getAllUsers,
        getAllDoctors,
        getAllMessages,
        getAllMedicine,
        getAllTelemedicineAppintment,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
