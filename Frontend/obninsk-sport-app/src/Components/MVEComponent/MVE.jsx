// MVE - Most Valueable Event
import './../../Components styles/MVEComponent styles/MVE.css';
import TypicalBtn from '../btnsComponents/TypicalBtn';

export default function MVE(props) {
    return(
        <div className="mve-container">
            <div className="main-part">
                <div className="mve-heading">
                    <img src={'./img/Basketball-icon-MVE.svg'} alt="sport type icon" className="mve-sport-type-icon" />
                    <div className="mve-title">Турнир FIBA 3X3</div>
                </div>
                <div className="mve-short-info">
                    <span className="stage">Полу-финал</span>
                    <span className="date">21.05-23-05</span>
                </div>
                <TypicalBtn btnType="link" href={`/news:${props.newsId}`} btnText="Узнать больше"/>
            </div>
        </div>
    )
}