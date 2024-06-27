import '../../Components styles/typicalBtnComponent styles/typicalBtn.css'

export default function TypicalBtn(props) {
    if (props.btnType === "link") {
        return (
            <button className="btn-container">
                <a href={props.href} className="btn-text">{props.btnText}</a>
            </button>
        )
    }
    
    else {
        return (
            <button className="btn-container">
                <span className="btn-text">{props.btnText}</span>
            </button>
        )   
    }
}