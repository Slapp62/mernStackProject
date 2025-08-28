const dummyCards = [
  // Sarah's Cards
  {
    title: "Cohen's Bakery",
    subtitle: "Fresh Bread Daily",
    description:
      "Traditional family bakery serving the finest breads, pastries, and cakes. Using authentic recipes passed down through generations. Open daily from 6 AM.",
    phone: "050-1234567",
    email: "info@cohensbakery.com",
    web: "https://www.cohensbakery.co.il",
    image: {
      url: "https://cdn.pixabay.com/photo/2014/12/21/23/28/cake-575781_960_720.jpg",
      alt: "Fresh baked goods display",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Tel-Aviv",
      street: "Dizengoff",
      houseNumber: 125,
      zip: 6546321,
    },
    likes: [],
    user_id: "68b0a60f2e7c039244a8787f",
    // Note: bizNumber, user_id, and createdAt will be set when inserting to database
  },
  {
    title: "Sarah's Art Studio",
    subtitle: "Creative Workshops & Classes",
    description:
      "Join our art classes for all skill levels. We offer painting, drawing, sculpture, and mixed media workshops in a welcoming environment. Materials provided.",
    phone: "050-1234567",
    email: "sarah@sarahartstudio.com",
    web: "https://www.sarahartstudio.com",
    image: {
      url: "https://cdn.pixabay.com/photo/2017/05/25/21/51/artist-2343417_960_720.jpg",
      alt: "Art studio with paintings and brushes",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Tel-Aviv",
      street: "Rothschild",
      houseNumber: 85,
      zip: 6578432,
    },
    likes: [],
    user_id: "68b0a60f2e7c039244a8787f",
  },

  // David's Cards
  {
    title: "Levi Tech Solutions",
    subtitle: "IT Support & Web Development",
    description:
      "Professional IT services including computer repair, network setup, website development, and digital marketing. Serving businesses and individuals with reliable technology solutions.",
    phone: "052-9876543",
    email: "contact@levitechsolutions.com",
    web: "https://www.levitechsolutions.co.il",
    image: {
      url: "https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341_960_720.jpg",
      alt: "Modern office with computers and technology",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Jerusalem",
      street: "King George",
      houseNumber: "42A",
      zip: 9426805,
    },
    likes: [],
    user_id: "68b0a60f2e7c039244a87888",
  },
  {
    title: "Jerusalem Tours with David",
    subtitle: "Historical & Cultural Tours",
    description:
      "Experience Jerusalem's rich history and culture with expert guided tours. Customizable routes covering ancient sites, religious landmarks, and hidden gems. Available in multiple languages.",
    phone: "052-9876543",
    email: "tours@jerusalemwithdavid.com",
    web: "https://www.jerusalemwithdavid.com",
    image: {
      url: "https://cdn.pixabay.com/photo/2018/07/29/04/50/old-city-3568451_960_720.jpg",
      alt: "Jerusalem Old City walls and architecture",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Jerusalem",
      street: "Jaffa Gate",
      houseNumber: 1,
      zip: 9711502,
    },
    likes: [],
    user_id: "68b0a60f2e7c039244a87888",
  },
];

module.exports = dummyCards;
