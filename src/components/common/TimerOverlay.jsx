import { useTimer } from "../../services/timerServices";

export default function TimerOverlay() {
  const timer = useTimer();

  // only to run timer logic, doesnt return any jsx
  return <></>;
}