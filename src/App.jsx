import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { GlobalContext, authReducer, authState } from "./GlobalContext";
import { useReducer, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PreLoader from "./Components/PreLoader";

function App() {
  const [loading, setLoading] = useState(false);
  const [auth, dispatch] = useReducer(authReducer, authState);
  return (
    <GlobalContext.Provider value={{ auth, dispatch, setLoading, alert }}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
        {loading && <PreLoader />}
        <Toaster />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
