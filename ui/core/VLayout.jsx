function VLayout({ children }) {

    return (
        <div className="v-layout flex w-full flex-col gap-1">
            {children}
        </div>
    );
}

window["vVLayout"] = VLayout;
export default VLayout;