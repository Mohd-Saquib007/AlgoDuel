function OutputConsole({ output }) {
    return (
        <div
            style={{
                background: "#1e1e1e",
                color: "white",
                padding: "10px",
                minHeight: "150px",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
            }}
        >
            {output}
        </div>
    );
}

export default OutputConsole;