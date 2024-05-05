import { useState } from "react";
import NavBar from "./layout/NavBar.tsx";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
    </>
  );
}
