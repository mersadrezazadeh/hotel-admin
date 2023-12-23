import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useUser } from "../features/Authentication/useUser";
import {
  createBookings,
  createCabins,
  createGuests,
  deleteBookings,
  deleteCabins,
  deleteGuests,
} from "../data/Uploader";

import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticating, isAuthenticated } = useUser();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) navigate("/login");
  }, [isAuthenticated, isAuthenticating, navigate]);

  async function uploadAll() {
    setIsUploading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsUploading(false);
  }

  useEffect(() => {
    if (isAuthenticated) uploadAll();
  }, [isAuthenticated]);

  if (isAuthenticating || isUploading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
