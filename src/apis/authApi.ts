import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { handleError, showMessage } from "../utils/helpers";
// import { useAppDispatch } from "../redux/store";

// Register
/*********************************************** ***********************************************/
export interface RegisterBody {
    email: string;
    password: string;
}

export type LoginBody = RegisterBody;


const registerApi = async (body: RegisterBody) => {
    console.log(body)
    return null
};


export const useRegisterApi = () => {

    // const navigate = useNavigate();
    return useMutation({
        mutationFn: registerApi,
        // onSuccess: (user) => {
        //     navigate(`/`, { replace: true });
        //     dispatch(storeUser({
        //         displayName: user.displayName,
        //         email: user.email,
        //         photoURL: user.photoURL,
        //         uid: user.uid,
        //     }));
        // },
        // onError: (err: unknown) => {
        // console.info(err, "auth failed");
        // if (err instanceof AuthError) {
        //     handleError(err);
        // } else {
        //     showMessage({ type: "error", msg: "An unexpected error occurred." });
        // }
        // }
    });
};

// Google login
/*********************************************** ***********************************************/


// const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     return result.user;
// };


// export const useGoogleLogin = () => {

//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();

//     const { mutate } = useLoginSuccess();

//     return useMutation({
//         mutationFn: handleGoogleSignIn,
//         onSuccess: (user) => {
//             mutate(user, {
//                 onSuccess: () => {
//                     navigate(`/`, { replace: true });
//                     dispatch(storeUser({
//                         displayName: user.displayName,
//                         email: user.email,
//                         photoURL: user.photoURL,
//                         uid: user.uid,
//                     }));
//                 }
//             })
//         },
//         onError: (err: unknown) => {
//             console.info(err, "auth failed")
//             if (err instanceof FirebaseError) {
//                 handleError(err);
//             } else {
//                 showMessage({ type: "error", msg: "An unexpected error occurred." });
//             }
//         }
//     });
// };

/***Run after google sign in.******************************************** ***********************************************/

// const LoginSuccess = async (user: User) => {
//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);

//     // If the document does not exist, create it
//     if (!userSnap.exists()) {
//         const userData = {
//             uid: user.uid,
//             displayName: user.displayName?.trim(),
//             searchKeywords: user.displayName ? user.displayName.trim().toLowerCase() : null,
//             email: user.email,
//             photoURL: user.photoURL,
//             role: "user",
//             createdAt: firestoreTimestamp(),
//             lastActiveAt: firestoreTimestamp(),
//         };
//         await setDoc(userRef, userData);
//     } else {
//         await updateDoc(userRef, {
//             lastActiveAt: firestoreTimestamp(),
//         });
//     }
// };

// export const useLoginSuccess = () => {
//     return useMutation({
//         mutationFn: LoginSuccess,
//         onError: (err) => {
//             console.info(err, "doc creation/update failed")
//             if (err instanceof FirebaseError) {
//                 handleError(err);
//             } else {
//                 console.error("Unexpected error:", err);
//                 showMessage({ type: "error", msg: "An unexpected error occurred." });
//             }
//         }
//     });
// };



/***Logout******************************************** ***********************************************/

// type UidType = Pick<User, "uid">;

export const logOut = async () => {
    return null
};

export const useLogOut = () => {

    const navigate = useNavigate();

    return useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            navigate(`/auth/login`, { replace: true });
            localStorage.removeItem("log")
        },
        onError: (err) => {
            console.log(err)
        }
    });
};

/***Get User******************************************** ***********************************************/

export const getUser = async () => {
    // return user
    return null
};

export const useGetUser = () => {
    return useQuery({
        queryKey: ["getUser"],
        queryFn: getUser,
    });
};
