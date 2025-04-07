import { User, Car, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4 shadow-lg">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Ride Application Dashboard
        </h2>

        <nav className="space-y-4">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "50px 560px",
            }}
          >
            <div
              style={{
                border: "1px solid black",
                padding: "50px",
                borderRadius: "5px",
              }}
            >
              <Link
                to="/passenger"
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 ${
                  isActive("/passenger") ? "bg-gray-800" : ""
                }`}
              >
                <div style={{ alignItems: "center" }}>
                  <User size={20} />
                  <span>Passenger</span>
                </div>
              </Link>
            </div>
            <div
              style={{
                border: "1px solid black",
                padding: "50px",
                borderRadius: "5px",
              }}
            >
              <Link
                to="/driver"
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 ${
                  isActive("/driver") ? "bg-gray-800" : ""
                }`}
              >
                <Car size={20} />
                <span>Driver</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div style={{ display: "flex" , justifyContent:"space-around"}}>
        <Button variant="contained" onClick={logout}>
          {" "}
          <LogOut size={20} /> Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
