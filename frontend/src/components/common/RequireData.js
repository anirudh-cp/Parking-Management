import useUserStore from "../../storages/AuthStore";
import { Navigate } from "react-router-dom";


export default function RequireData({ children }) {

    const { name, plate } = useUserStore()

    return (name!="" && plate!="") ? children : <Navigate to="/" replace />;
}
