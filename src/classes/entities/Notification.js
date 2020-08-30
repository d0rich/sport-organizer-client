import {User, Event, NotType} from "@/classes";

export class Notification{
    constructor( not = { ID: null } ) {
        this.ID = not.ID
        this.Comment = not.Comment
        this.NotTypeID = not.NotTypeID
        this.NotType = new NotType(not['Not-type'])
        this.UserID = not.UserID
        this.User = new User(not.User)
        this.EventID = not.EventID
        this.Event = new Event(not.Event)
        this.createdAt = new Date(not.createdAt)
        this.updatedAt = new Date(not.updatedAt)
        this.icon = 'mdi-bell'
    }
}
