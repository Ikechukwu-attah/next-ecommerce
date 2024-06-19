interface LeftSidNavbarI {
  id: number;
  title: string;
  url: string;
}

interface SlidesI {
  id: number;
  title: string;
  description: string;
  img: string;
  url: string;
  bg: string;
}

interface FooterLinkI {
  id: number;
  link: string;
  url: string;
}
interface FooterI {
  id: number;
  title: string;
  data: FooterLinkI[];
}

export const leftSidNavbar: LeftSidNavbarI[] = [
  {
    id: 1,
    title: "HomePage",
    url: "/",
  },

  {
    id: 2,
    title: "Shope",
    url: "/",
  },

  {
    id: 3,
    title: "Deals",
    url: "/",
  },

  {
    id: 4,
    title: "About",
    url: "/",
  },

  {
    id: 5,
    title: "Contact",
    url: "/",
  },

  {
    id: 6,
    title: "Logout",
    url: "/",
  },

  {
    id: 7,
    title: "Cart(2)",
    url: "/",
  },
];

export const bigScreenSidNavbar: LeftSidNavbarI[] = [
  {
    id: 1,
    title: "HomePage",
    url: "/",
  },

  {
    id: 2,
    title: "Shope",
    url: "/",
  },

  {
    id: 3,
    title: "Deals",
    url: "/",
  },

  {
    id: 4,
    title: "About",
    url: "/",
  },

  {
    id: 5,
    title: "Contact",
    url: "/",
  },
];

export const slides: SlidesI[] = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "gradient-to-r from-blue-50 to-yellow-50",
  },
];

export const footerData: FooterI[] = [
  {
    id: 1,
    title: "company",
    data: [
      {
        id: 1,
        url: "/",
        link: "About",
      },

      {
        id: 2,
        url: "/",
        link: "Careers",
      },

      {
        id: 2,
        url: "/",
        link: "Affiliates",
      },

      {
        id: 2,
        url: "/",
        link: "Blogs",
      },

      {
        id: 2,
        url: "/",
        link: "Contact Us",
      },
    ],
  },
];
