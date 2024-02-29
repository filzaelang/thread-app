import { Outlet, Route, Navigate, useNavigate, Routes } from 'react-router-dom'
import { API, setAuthToken } from './libs/api'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { AUTH_CHECK } from './store/rootReducer'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Follows from './pages/Follows'
import Profile from './pages/Profile'
import ProfileOthers from './pages/ProfileOthers'
import CreatePost from './pages/CreatePost'
import LogOut from './pages/LogOut'
import Login from './pages/Login'
import Register from './pages/Register'
import ThreadDetail from './pages/ThreadDetail'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function checkAuth() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data));
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/login")
    } else {
      checkAuth()
    }
  }, [])

  function isNotLogin() {
    if (!localStorage.token) {
      return <Navigate to="/login" />;
    }

    return <Outlet />;
  }

  function isLogin() {
    if (localStorage.token) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  }


  return (
    <>
      <Routes>
        {/* Main routes */}
        <Route path='/' element={isNotLogin()}>
          <Route
            path="/"
            element={
              <RootLayout>
                <Home />
              </RootLayout>
            }
          />
          <Route
            path="/thread/:id"
            element={
              <RootLayout>
                <ThreadDetail />
              </RootLayout>
            }
          />
          <Route
            path="/search"
            element={
              <RootLayout>
                <Search />
              </RootLayout>
            }
          />
          <Route
            path="/follows"
            element={
              <RootLayout>
                <Follows />
              </RootLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <RootLayout>
                <Profile />
              </RootLayout>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <RootLayout>
                <ProfileOthers />
              </RootLayout>
            }
          />
          <Route
            path="/create-post"
            element={
              <RootLayout>
                <CreatePost />
              </RootLayout>
            }
          />
          <Route
            path="/logout"
            element={
              <RootLayout>
                <LogOut />
              </RootLayout>
            }
          />
        </Route>

        {/* Additional routes */}
        <Route path='/' element={isLogin()}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
