import { Model } from "sequelize";

export interface Article{
    id: number,
    title: string,
    text: string,
    img: Uint8Array|null,
    event_id: number|null,
    deleted: boolean
}

export class ArticleModel extends Model<Article>{}