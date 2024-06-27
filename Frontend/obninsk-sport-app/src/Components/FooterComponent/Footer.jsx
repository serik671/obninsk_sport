

import '../../Components styles/FooterComponent styles/FooterComponent.css';

export default function Footer() {
    return(
        <footer>
            <div className="footer-container">
                <div className="info">
                    <span className="footer-line">&#169; 2024-2025 "Обнинск спорт"</span>
                    <span className="footer-line">ООО “Обнинск спорт”, адрес местонахождения: 123123, Россия, г. Обнинск, ул. Пушкина, д. 52</span>
                    <span className="footer-line">Адрес для обращения пользователей: <a className='contact-mail' href=" vlad.b8239@gmail.com">vlad.b8239@gmail.com</a></span>
                </div>
                <div className="links">
                    <img src="./img/vk icon.svg" alt="" className="contact-link" />
                    <img src="./img/telegram icon.svg" alt="" className="contact-link" />
                    <img src="./img/YouTube icon.svg" alt="" className="contact-link" />
                </div>
            </div>
        </footer>
    )
}