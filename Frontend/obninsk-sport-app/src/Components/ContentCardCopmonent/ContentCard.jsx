import '../../Components styles/ContentCardComponent styles/ContentCard.css';
import TypicalBtn from '../btnsComponents/TypicalBtn';

export default function ContentCard(props) {
    return(
        <div className="card-container">
            <div className="card-label">
                <img src={"./img/Volleyball-icon-default.svg"} alt="sport logo" className="sport-icon" />
                <span className="title">{props.cardTitle}</span>
            </div>
            <span className="date">{props.date}</span>
            <p className="short-info">{props.shortInfo}</p>
            <TypicalBtn btnType="link" btnText="Перейти к новости" href={props.contentType === 'article' ? `/article:${props.contentId}` : `news${props.contentId}`}/>
        </div>
    )
}