import { LuCastle } from "react-icons/lu";
import { ImSphere } from "react-icons/im";
import { GiElephant, GiCastle } from "react-icons/gi";
import { FaHotel } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { TbRollercoaster } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

export const SIDE_MENU_DATA = {
  main: [
    {
      id: "01",
      label: "Home",
      icon: IoHome,
      path: "/",
    },
  ],
  user: [
    {
      id: "02",
      label: "User Page",
      icon: FaUser,
      path: "/user",
    },
    {
      id: "02",
      label: "Your Page",
      icon: FaUser,
      path: "/login",
    },
  ],
  disneyworld: [
    {
      id: "03",
      label: "Magic Kingdom",
      icon: LuCastle,
      path: "/magickingdom",
    },
    {
      id: "04",
      label: "Epcot",
      icon: ImSphere,
      path: "/epcot",
    },
    {
      id: "05",
      label: "Animal Kingdom",
      icon: GiElephant,
      path: "/animalkingdom",
    },
    {
      id: "06",
      label: "Hollywood Studios",
      icon: FaHotel,
      path: "/hollywoodstudios",
    },
  ],
  disneyland: [
    {
      id: "07",
      label: "Disneyland",
      icon: GiCastle,
      path: "/disneyland",
    },
    {
      id: "08",
      label: "California Adventure",
      icon: TbRollercoaster,
      path: "/californiaadventure",
    },
  ],
};

export const DISNEY_WORLD_PARKS_LIST = [
  {
    id: "01",
    name: "Magic Kingdom",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/630/354/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/cinderella-castle/0724ZQ_0195MS_JLM-16x9.jpg",
    hoursUrl: "magickingdom-parkhours",
    waitTimesUrl: "magickingdom-waittimes",
    ignored: [
      "Trick-or-Treat Locations at Mickey's Not-So-Scary Halloween Party",
      "Casey Jr. Splash 'N' Soak Station",
      "Allergy-Friendly Trick-or-Treat Experience at Mickey's Not-So-Scary Halloween Party",
    ],
    stores: [],
    timezone: "America/New_York",
  },
  {
    id: "02",
    name: "Epcot",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1200/675/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/spaceship-earth/0502ZN_0017AS_JB_1-16x9.jpg",
    hoursUrl: "epcot-parkhours",
    waitTimesUrl: "epcot-waittimes",
    ignored: ["GRAB-N-GOOF"],
    stores: [],
    timezone: "America/New_York",
  },
  {
    id: "03",
    name: "Animal Kingdom",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/715/715/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/tree-of-life/tree-of-life-gallery01-16x9.jpg",
    hoursUrl: "animalkingdom-parkhours",
    waitTimesUrl: "animalkingdom-waittimes",
    ignored: [],
    stores: [],
    timezone: "America/New_York",
  },
  {
    id: "04",
    name: "Hollywood Studios",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1200/675/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/hollywood-tower-of-terror/Disneys-Hollywood-Studios-27-16x9.jpg",
    hoursUrl: "hollywoodstudios-parkhours",
    waitTimesUrl: "hollywoodstudios-waittimes",
    ignored: [],
    stores: [],
    timezone: "America/New_York",
  },
];

export const DISNEYLAND_PARKS_LIST = [
  {
    id: "05",
    name: "Disneyland",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1349/464/75/dam/disneyland/attractions/disneyland/sleeping-beauty-castle-walkthrough/sleeping-beauty-castle-exterior-16x9.jpg",
    hoursUrl: "disneyland-parkhours",
    waitTimesUrl: "disneyland-waittimes",
    ignored: [
      "Galactic Grill’s Seasonal Novelty Release",
      "Troubadour Tavern's Seasonal Novelty Release",
      "Hungry Bear Barbecue Jamboree’s Seasonal Novelty Release",
    ],
    stores: ["Pooh Corner"],
    timezone: "America/Los_Angeles",
  },

  {
    id: "06",
    name: "California Adventure",
    image:
      "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/3840/2160/75/vision-dam/digital/parks-platform/parks-global-assets/disneyland/attractions/pixar-pier/dca-pixar-pier-day-16x9.jpg",
    hoursUrl: "californiaadventure-parkhours",
    waitTimesUrl: "californiaadventure-waittimes",
    ignored: [
      "Hollywood Land’s Seasonal Novelty Release",
      "Paradise Gardens’ Seasonal Novelty Release",
      "Cozy Cone Motel 5 - Popcone ",
      "DisneylandResortCaliforniaAdventure_dc2e7388-5618-4fe3-8287-096270978829",
    ],
    stores: ["Trolley Treats", "Bing Bong's Sweet Stuff"],
    timezone: "America/Los_Angeles",
  },
];
