import {Event} from '@/classes'
import colors from 'vuetify/lib/util/colors'
export class ClientEvent{
    constructor( event = new Event() ) {
        this.name = event.Name
        this.description = event.Description
        this.start = new Date(event.TimeRange[0].value)
        this.end = new Date(event.TimeRange[1].value)
        this.timed = true
        switch (event.EventTypeID) {
            case 1:
                this.color = colors.purple.base
                break
            case 2:
                this.color = colors.red.base
                break
            case 3:
                this.color = colors.lime.darken3
                break
            case 4:
                this.color = colors.amber.darken4
                break
            case 5:
                this.color = colors.lightBlue.base
                break
            case 6:
                this.color = colors.pink.base
                break
            case 7:
                this.color = colors.deepOrange.base
                break
            case 8:
                this.color = colors.green.base
                break
        }
    }
}
