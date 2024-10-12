function Input({ width, type, value, ...props }) {

    const handleChange = (e) => {
        const newValue = e.target.value;
        const { ws } = window
        ws.send(
            JSON.stringify({ type: "input", id: props.id, value: newValue })
        );
    };

    if (!width) {
        width = 100
    }

    return (
        <div className="overflow-hidden" style={{ width: `${width}%` }}>
            <input
                type={type}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={value}
                onChange={handleChange}
                {...props}
            />
        </div>
    )
}



window["vInput"] = Input
export default Input
