import {Schema, model, models, Document} from "mongoose";
import slugify from 'slugify';
import { parse, format, isValid } from 'date-fns';
export interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: string;
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
    title: { type: String, required: [true,'title is required'], trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: [true,'description is required'], trim: true},
    overview: { type: String, required: [true,'overview is required'], trim: true },
    image: { type: String, required: [true,'image URL required'], trim: true },
    venue: { type: String, required: [true,'venue is required'], trim: true },
    location: { type: String, required: [true,'location is required'], trim: true },
    date: { type: String, required: [true,'date is required'], trim: true },
    time: { type: String, required: [true,'time is required'], trim: true },
    mode: { type: String, required: [true,'mode is required'], enum:['online','offline','hybrid'],message: 'Mode must be either online, offline, or hybrid'},
    audience: { type: String, required: [true,'audience is required'], trim: true },
    agenda: {
        type: [String],
        required: true,
        minlength: [1, "At least one agenda item is required"],
    },
    organizer: {
        type: String,
        required: [true, 'Organizer is required'],
        trim: true,
    },
    tags:{
        type: [String],
        required: true,
        minLength: [1, "At least one tag is required"],
    },
    },
    {
        timestamps: true,
    }
)

EventSchema.pre('save', function (next:any) {
    const event = this as IEvent;

    // Slug generation
    if (event.isModified('title') || event.isNew) {
        event.slug = slugify(event.title, {
            lower: true,
            strict: true,
            trim: true,
        });
    }

    // Normalize date → YYYY-MM-DD
    if (event.isModified('date')) {
        const parsedDate = parse(event.date, 'yyyy-MM-dd', new Date());
        if (!isValid(parsedDate)) {
            return next(new Error('Invalid date format'));
        }
        event.date = format(parsedDate, 'yyyy-MM-dd');
    }

    // Normalize time → HH:mm (24h)
    if (event.isModified('time')) {
        const parsedTime = parse(event.time, 'HH:mm', new Date());
        if (!isValid(parsedTime)) {
            return next(new Error('Invalid time format'));
        }
        event.time = format(parsedTime, 'HH:mm');
    }

    next();
});

EventSchema.index({ slug: 1 }, { unique: true });
EventSchema.index({ date: 1, mode: 1 });

const Event = models.Event || model<IEvent>('Event', EventSchema);
export default Event;
