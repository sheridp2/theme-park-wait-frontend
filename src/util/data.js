import {
  LuLayoutDashboard,
  LuCastle,
} from "react-icons/lu"
import { ImSphere } from "react-icons/im";

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
    path: "/magic-kingdom",
  },

  {
    id: '02',
    label: "Epcot",
    icon: ImSphere,
    path: "/Epcot",
  },
  
]

export const PARKS_LIST = [
  {
    id: '01',
    name: "Magic Kingdom",
    image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/630/354/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/cinderella-castle/0724ZQ_0195MS_JLM-16x9.jpg",
    hoursUrl: "disneyworld-magickingdom-parkhours",
    waitTimesUrl: "disneyworld-magickingdom-waittimes"
  },
  {
    id: '02',
    name: "Epcot",
    image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1200/675/75/vision-dam/digital/parks-platform/parks-global-assets/disney-world/attractions/spaceship-earth/0502ZN_0017AS_JB_1-16x9.jpg",
    hoursUrl: "disneyworld-epcot-parkhours",
    waitTimesUrl: "disneyworld-epcot-waittimes"
  }
]
