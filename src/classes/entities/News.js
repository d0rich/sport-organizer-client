import {Section, User, Event} from '@/classes'

export class News{
    constructor( news = { ID: null }) {
        this.ID = news.ID
        this.Header = news.Header
        this.Text = news.Text
        this.SectionID = news.SectionID
        this.Section = new Section(news.Section)
        this.UserID = news.UserID
        this.User = new User(news.User)
        this.EventID = news.EventID
        if(this.EventID === null) this.Event = null
        else this.Event = new Event(news.Event)
        this.createdAt = new Date(news.createdAt)
        this.updatedAt = new Date(news.updatedAt)
    }
}
