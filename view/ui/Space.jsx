function Space({ width }) {
    if (!width) {
        width = 100;
    }

    return <div style={{ width: `${width}%` }} />;
}

window["vSpace"] = Space;
export default Space;