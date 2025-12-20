export type Event = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
};

export const events: Event[] = [
    {
        image: "/images/event1.png",
        title: "React Summit 2025",
        slug: "react-summit-2025",
        location: "Amsterdam, Netherlands",
        date: "June 13–14, 2025",
        time: "09:00 AM – 06:00 PM",
    },
    {
        image: "/images/event2.png",
        title: "Google I/O Extended Dhaka",
        slug: "google-io-extended-dhaka-2025",
        location: "Dhaka, Bangladesh",
        date: "July 20, 2025",
        time: "10:00 AM – 05:00 PM",
    },
    {
        image: "/images/event3.png",
        title: "Hack the Future Hackathon",
        slug: "hack-the-future-2025",
        location: "Online (Global)",
        date: "August 2–4, 2025",
        time: "48 Hours",
    },
    {
        image: "/images/event4.png",
        title: "JSConf Asia",
        slug: "jsconf-asia-2025",
        location: "Singapore",
        date: "September 12–13, 2025",
        time: "09:30 AM – 06:30 PM",
    },
    {
        image: "/images/event5.png",
        title: "Next.js Conf",
        slug: "nextjs-conf-2025",
        location: "San Francisco, USA",
        date: "October 8, 2025",
        time: "10:00 AM – 06:00 PM",
    },
    {
        image: "/images/event6.png",
        title: "DevFest Bangladesh",
        slug: "devfest-bangladesh-2025",
        location: "Dhaka, Bangladesh",
        date: "November 15, 2025",
        time: "09:00 AM – 05:30 PM",
    },
];
