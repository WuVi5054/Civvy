import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getEvents = query({
    args: {},
    handler: async ( { db } ) => {
      return await db.query("events").collect();
    },
  });

  export const getSpecificEvents = query({
    args: {
        eventId: v.string(),
    },
    handler: async ( { db }, { eventId } ) => {
        return await db.query("events").filter((q) => q.eq(q.field("eventId"), eventId)).first();
    },
  });

  export const joinEvent = mutation({
    args: {
        eventId: v.string(),
        userId: v.string(),
    },
    handler: async ( { db }, { eventId, userId } ) => {
        const selectedEvent = await db.query("events").filter((q) => q.eq(q.field("eventId"), eventId)).first();

        if (selectedEvent) {    
            if (selectedEvent.guests.includes(userId)) {
                return { message: "User already joined the event" };
            }
            const newGuests = [...selectedEvent.guests, userId];
            await db.patch(selectedEvent._id, { guests: newGuests });
            const existingUser = await db
                                .query("users")
                                .filter((q) => q.eq(q.field("userId"), userId))
                                .first();

            if (existingUser) {
            const newEvents = [...existingUser.events, eventId];
            await db.patch(existingUser._id, { events: newEvents });
            return { message: "User joined new events", newEvents };
            } else {
            return { message: "User not found" };
            }
        } else {
            return { message: "Event not found" };
        }
    },
  });


export const createEvent = mutation({
    args: {
        userId: v.string(),
        title: v.string(),
        description: v.string(),
        date: v.string(),
        location: v.string(),
        time: v.string(),
        eventId: v.string(),
        guests: v.array(v.string()),
    },
    handler: async ({ db }, { title, description, date, location, time, userId, eventId, guests }) => {
        await db.insert("events", { title, description, date, location, time, createdBy: userId, eventId, guests });
        const existingUser = await db
                                .query("users")
                                .filter((q) => q.eq(q.field("userId"), userId))
                                .first();

        if (existingUser) {
        const newEvents = [...existingUser.events, eventId];
        await db.patch(existingUser._id, { events: newEvents });
        return { message: "User joined new events", newEvents };
        } else {
        return { message: "User not found" };
        }
    }
  });


  export const editEvent = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        date: v.string(),
        location: v.string(),
        time: v.string(),
        eventId: v.string(),
    },
    handler: async ({ db }, { title, description, date, location, time, eventId }) => {
        const exisitingEvent = await db.query("events").filter((q) => q.eq(q.field("eventId"), eventId)).first();
        
        if (exisitingEvent) {
            await db.patch(exisitingEvent._id, { 
                title: title, 
                description: description, 
                date: date, 
                location: location, 
                time: time });
            return exisitingEvent;
        } else {
            return { message: "Event not found" };
        }
    }
  });