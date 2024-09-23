function HLayout({ children }) {

    return (
        <div className="h-layout flex w-full flex-nowrap gap-1">
            {children}
        </div>
    );
}

window["vHLayout"] = HLayout;
export default HLayout;