import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import '@primer/css/dist/primer.css'

import { App } from './App'

import { HomePage } from './pages/HomePage'
import { AirportPage } from './pages/AirportPage'
import { AirportChartPage } from './pages/AirportChartPage'
import { AboutPage } from './pages/AboutPage'
import { UpdatesPage } from './pages/UpdatesPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "updates",
    element: <UpdatesPage />,
  },
  {
    path: "app",
    children: [
      {
        path: "airport/:icao",
        element: <AirportPage />,
        children: [
          {
            path: "chart/:chartId",
            element: <AirportChartPage />,
          }
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>,
)
