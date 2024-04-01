import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './store/rootReducer.ts'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
