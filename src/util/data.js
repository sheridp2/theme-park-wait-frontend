import {
  LuLayoutDashboard,
  LuCastle,
} from "react-icons/lu"
import { ImSphere } from "react-icons/im";
import { GiElephant } from "react-icons/gi";
import { FaHotel } from "react-icons/fa6";

export const SIDE_MENU_DATA = [
  {
    id: '01',
    label: "Home Page",
    icon: LuLayoutDashboard,
    path: "/",
  },
  {
    id: '02',
    label: "Magic Kingdom",
    icon: LuCastle,
    path: "/magickingdom",
  },

  {
    id: '02',
    label: "Epcot",
    icon: ImSphere,
    path: "/epcot",
  },
  {
    id: '03',
    label: "Animal Kingdom",
    icon: GiElephant,
    path: "/animalkingdom",
  },

  {
    id: '04',
    label: "Hollywood Studios",
    icon: FaHotel,
    path: "/hollywoodstudios",
  },
  
]

export const PARKS_LIST = [
  {
    id: '01',
    name: "Magic Kingdom",
    image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/630/354/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/cinderella-castle/0724ZQ_0195MS_JLM-16x9.jpg",
    hoursUrl: "disneyworld-magickingdom-parkhours",
    waitTimesUrl: "disneyworld-magickingdom-waittimes",
    ignored: ["Trick-or-Treat Locations at Mickey's Not-So-Scary Halloween Party", "Casey Jr. Splash 'N' Soak Station", "Allergy-Friendly Trick-or-Treat Experience at Mickey's Not-So-Scary Halloween Party"]

  },
  {
    id: '02',
    name: "Epcot",
    image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1200/675/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/spaceship-earth/0502ZN_0017AS_JB_1-16x9.jpg",
    hoursUrl: "disneyworld-epcot-parkhours",
    waitTimesUrl: "disneyworld-epcot-waittimes",
    ignored:["GRAB-N-GOOF"]
  },
  {
    id: '03',
    name: "Animal Kingdom",
    image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/715/715/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/tree-of-life/tree-of-life-gallery01-16x9.jpg",
    hoursUrl: "disneyworld-animalkingdom-parkhours",
    waitTimesUrl: "disneyworld-animalkingdom-waittimes",
    ignored:[]
  },
  {
    id: '04',
    name: "Hollywood Studios",
    image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1200/675/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/hollywood-tower-of-terror/Disneys-Hollywood-Studios-27-16x9.jpg",
    hoursUrl: "disneyworld-hollywoodstudios-parkhours",
    waitTimesUrl: "disneyworld-hollywoodstudios-waittimes",
    ignored:[]
  }
]
