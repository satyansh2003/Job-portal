import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@/App.css';
import React, { useState } from 'react';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import SecondaryHome from './components/SecondaryHome';
import TestUD  from './components/TestUD';
import { Job } from '../../backend/models/job.model';
import { Lightbulb } from 'lucide-react';
import Chatbot from './chatbot';
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'/chatbot',
    element:<Chatbot/>
  },
  {
    path: '/home',
    element: <SecondaryHome />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/jobs',  
    element: <Jobs />,
  },
  {
    path: '/description/:id',
    element: <JobDescription />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: "/test",
    element: <TestUD />
  },
  // admin ke liye yha se start hoga
  {
    path: '/admin/companies',
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />,
  },
  {
    path: '/admin/companies/:id',
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs',
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/jobs/create',
    element: <PostJob />,
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const [toggle, setToggle] = useState(false);
  console.log(toggle)

  return (
    <div className={`${toggle ? 'bg-gray-800' : 'bg-white'}`}>
      <div
        className="fixed top-4 right-5 z-[100] cursor-pointer"
        onClick={() => {
          setToggle((prevToggle) => !prevToggle); // Toggle state
        }}
      >
        <Lightbulb height={30} width={30} color='orange'/>
      </div>
      <RouterProvider router={appRouter}>
        
      </RouterProvider>
    </div>
  );
}

export default App;
