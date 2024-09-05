import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/Home";
import ChallengeDetails from "./Pages/ChallengeDetails";
import Navbar from "./components/Navbar";
import ChallengeForm from "./components/ChallengeForm";
import { ChallengeProvider } from "./context/ChallengeContext";
import NotFoundPage from "./Pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/challenge-details/:id",
    element: <ChallengeDetails />,
  },
  {
    path: "/challenge-add",
    element: <ChallengeForm isEditMode={false} />,
  },
  {
    path: "/challenge-edit/:id",
    element: <ChallengeForm isEditMode={true} />,
  },
 {
  path:"*",
  element :<NotFoundPage/>
 }
]);

function App() {
  return (
    <ChallengeProvider>
    <div className="max-w-screen-2xl container flex-1 sm:mx-auto">
      <Navbar />
      <RouterProvider router={router} />
    </div>
    </ChallengeProvider>
  );
}

export default App;
