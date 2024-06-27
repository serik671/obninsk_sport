import Header from "../Components/HeaderComponent/Header";
import MVE from "../Components/MVEComponent/MVE";
import ContentCard from "../Components/ContentCardCopmonent/ContentCard";
import Footer from "../Components/FooterComponent/Footer";

import '../Components styles/MainPage styles/MainPage.css';

export default function MainPage() {
    return(
        <body>
            <div className="container">
                <Header/>
                <main>
                    <MVE newsId={1}/>
                </main>
            </div>
            <div className="news-and-events">
                <div className="section-label">^ Для вас ----</div>
                <div className="content">
                    <ContentCard cardTitle="Название новости" date="30.04.2024" shortInfo='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur vero voluptatum velit quibusdam saepe voluptate laudantium at, et omnis vitae ut consequatur corporis placeat in veritatis ipsa quod laboriosam inventore' contentType="article" contentId={1}/>
                    <ContentCard/>
                    <ContentCard/>
                    <ContentCard/>
                </div>
                <Footer/>
            </div>  
        </body>
    )
}