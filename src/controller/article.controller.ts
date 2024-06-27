import { Article, ArticleModel } from "../database/model/article.model";

export class ArticleController{
    public async create(article: Article){
        await ArticleModel.build(article).validate();
        await ArticleModel.create(article);
    }
    public async read(id: number){
        let article =(await ArticleModel.findByPk(id))?.get();
        return article;
    }
    public async readMany(count: number){
        let articles = (await ArticleModel.findAll({limit: count})).map(table=>table.get());
        return articles;
    }
    public async update(id: number, article: Article){
        await ArticleModel.build(article).validate();
        await ArticleModel.update(article, {where: {id: id}}); 
    }
    public async delete(id: number){
        await ArticleModel.destroy({where: {id: id}});
    }
}