import { useEffect } from "react";
import { getProblems } from "./api/problem";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    async function fetchProblems() {
      try {
        const data = await getProblems();

        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProblems();
  }, []);

  return <AppRoutes />;
}

export default App;
