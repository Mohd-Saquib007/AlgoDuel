import { useEffect } from "react";
import { getProblems } from "./api/problem";

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

    return (
        <h1>AlgoDuel</h1>
    );
}

export default App;