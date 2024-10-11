import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { DashPosts } from "../components/DashPosts";
import { DashUsers } from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";

function SkeletonLoader() {
  return (
    <div className="p-4 animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-40 bg-gray-300 rounded"></div>
      <div className="h-40 bg-gray-300 rounded"></div>
    </div>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

    // Simulate loading time for demo purposes
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000); // adjust time as needed

    return () => clearTimeout(timeoutId); // cleanup timeout
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar />
      </div>

      <div className="flex-grow p-4">
        {loading && <SkeletonLoader />}

        {!loading && tab === 'profile' && <DashProfile />}
        {!loading && tab === 'posts' && <DashPosts />}
        {!loading && tab === 'users' && <DashUsers />}
        {!loading && tab === 'comments' && <DashComments />}
        {!loading && tab === 'dash' && <DashboardComp />}
      </div>
    </div>
  );
}
