import { SignedIn, SignedOut, UserButton, SignInButton,useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/homepage";
import AuthPage from "./pages/AuthPage";
import toast from "react-hot-toast";
import CallPage from "./pages/CallPage";
const App = () => {
  const{isSignedIn,isLoaded}=useAuth();
  if(!isLoaded){return null}
  return (
    
    
     
        <Routes>

          <Route path="/" element={ isSignedIn ? <HomePage/> : <Navigate to={"/auth"} replace />} />
          <Route path="/auth" element={!isSignedIn ? <AuthPage/> : <Navigate to={"/"} replace />}/>
     
            <Route path="/call/:id" element={isSignedIn ? <CallPage/> : <Navigate to={"/auth"} replace />}/>
          
          <Route path="*" element={!isSignedIn ? <Navigate to={"/auth"} replace /> : <Navigate to={"/"} replace />}/>
        </Routes>
     
    
  );
};

export default App;



// due to slow use another method
//  <header>
    
//       <SignedIn>
//         <Routes>

//           <Route path="/" element={<HomePage/>}/>
//           <Route path="/auth" element={<Navigate to={"/"} replace />}/>
//         </Routes>
//       </SignedIn>


//         <SignedOut>
//         <Routes>
//           <Route path="/auth" element={<AuthPage/>}/>
//           <Route path="*" element={<Navigate to={"/auth"} replace />}/>
//         </Routes>
//       </SignedOut>
//     </header>