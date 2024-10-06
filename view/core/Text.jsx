function Text({ text }) {
    return <p style={{ whiteSpace: 'nowrap' }}>{text}</p>
}

window["vText"] = Text;
export default Text