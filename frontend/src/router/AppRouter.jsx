// src/router/AppRouter.jsx
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
  } from "react-router-dom"; 
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import CreatePostPage from "../pages/CreatePostPage";
import PostDetailsPage from "../pages/PostDetailsPage";
function AppRouter() {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
       <Route path="/" element={<Homepage />} />
       <Route path="/create" element={<CreatePostPage />} />
       <Route path="/posts/:id" element={<PostDetailsPage />} />
        </Route>
      )
    );
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  }
export default AppRouter;
