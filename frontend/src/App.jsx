import React, { useEffect, useState, lazy, Suspense, createContext } from "react";
import "./App.css";
import { Auth } from "./pages/Auth";
import { auth } from "./utils/firebaseUtils";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoadingPage from "./components/Loading";
import ErrorPage from "./pages/ErrorPage";
import ParentContainer from "./pages/ParentContainer";
import ParentContainerFiller from "./components/ParentContainerFiller";

const Profile = lazy(() => import('./pages/Profile'));
const HomeScreen = lazy(() => import('./pages/HomeScreen'));

// prop drilling avoidance.
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onAuthStateChangedHandler(authUser) {
    if (authUser) {
      if (authUser?.emailVerified) {
        setUser(authUser);
      } else {
        await signOut(auth);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);
    return () => {
      unsubscribe();
    };
  }, []);

  function GenericWrapper({ children }) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <UserContext.Provider value={user}>
          {children}
        </UserContext.Provider>
      </Suspense>
    );
  }

  const router = createBrowserRouter(
    user ? [
      { path: '/',
        element: <UserContext.Provider value={user}><ParentContainer/></UserContext.Provider>,
        errorElement:<ErrorPage/>,
        children:[
      { path: '/home', 
        element: <GenericWrapper children={<HomeScreen />} />,
        errorElement:<ErrorPage/>,
       },
      { path: '/profile',
        element: <GenericWrapper children={<Profile />} />,
        errorElement: <ErrorPage/>, 
      },
      {
        path:'/',
        element:<ParentContainerFiller/>
      },
      {
        path:'*',
        element:<ErrorPage/>,
        errorElement:<ErrorPage/>
      }
        ]
     }
    ] : [
      { path: '/', 
        element: loading ? <LoadingPage /> : <Auth />,
        errorElement:<ErrorPage/>
       }
       ,{
        path:'*',
        element:<ErrorPage/>
       }
    ]
  );
  

  return (
    <>
  <ChakraProvider>
    {loading ? (
      <LoadingPage />
    ) : (
      <RouterProvider router={router} />
    )}
  </ChakraProvider>
    </>
  );
}

export default App;