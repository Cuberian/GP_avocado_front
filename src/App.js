import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";

function App() {
    const {user} = useContext(Context)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(userData => {
            if(userData) {
                console.log(userData)
                user.setUser(userData)
                user.setIsAuth(true)
            }
            else {
                user.setUser({})
                user.setIsAuth(false)
            }
        }).finally(() => {setLoading(false)})
    }, [])

  return (
      <BrowserRouter>
          <div className="w-screen flex flex-col justify-between min-h-screen bg-specialGray-200">
              <NavBar/>
              { !loading && <AppRouter/> }
              <div className="w-screen flex justify-center py-2 bg-specialGray-600">
                  <div className="flex items-center">
                      <div className="w-20 h-20">
                          <img src="/avocado.png" alt="" className="w-full h-full object-cover"/>
                      </div>
                      <span className="font-pressStart text-4xl text-white">AVOCADO</span>
                  </div>
              </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
