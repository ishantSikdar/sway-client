import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PLAYLIST } from "../../constants/routes";

export default function DefaultPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTE_PLAYLIST);
  }, []); 

  return <></>;
}