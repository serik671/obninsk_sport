import { Model } from "sequelize";

export interface Article{
    id: number,
    title: string,
    text: string,
    img: Uint8Array,
    event_id: number
}

export class ArticleModel extends Model<Article>{}