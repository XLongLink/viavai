function HLayout({ children }) {
    return (
        <div className="h-layout">
            {children}
        </div>
    );
}

window["vHLayout"] = HLayout;
export default HLayout;