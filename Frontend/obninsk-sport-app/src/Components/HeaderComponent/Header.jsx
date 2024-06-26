import '../../Components styles/HeaderComponent styles/Header.css'

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    <a href="/">
                        <img src={'./img/Logo.svg'} alt="Logo" />
                    </a>
                </div>
                <nav>
                    <a href='/news' className="nav-element">Новости</a>
                    <a href='/calendar' className="nav-element">Календарь</a>
                </nav>
                <img className='profile' src={'./img/Profile.svg'} alt="profile" />
            </div>
        </header>
    )
}