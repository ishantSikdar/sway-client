import CoursesMainPage from "../pages/course/CoursesMainPage";
import GroupsMainPage from "../pages/groupChat/GroupsMainPage";
import DefaultPage from "../pages/others/DefaultPage";
import PlaylistMainPage from "../pages/playlist/PlaylistMainPage";
import SubjectPage from "../pages/playlist/SubjectPage";
import EduShortsMainPage from "../pages/shorts/EduShortsMainPage";
import FocusTimerMainPage from "../pages/timer/FocusTimerMainPage";
import LoginPage from "../pages/user/LoginPage";
import SignUpPage from "../pages/user/SignUpPage";
import UserMainPage from "../pages/user/UserMainPage";
import TopicPage from "../pages/playlist/TopicPage";
import VideoPage from "../pages/playlist/VideoPage";
import OtherUsersPage from "../pages/user/OtherUsersPage";


// ROUTES
export const ROUTE_DEFAULT = "/";
export const ROUTE_LOGIN = "/login";
export const ROUTE_SIGNUP = "/signup";

export const ROUTE_USER_PAGE = "/user";
export const ROUTE_PUBLIC_USER_PAGE = "/user/:userId";

export const ROUTE_PLAYLIST = "/playlist";
export const ROUTE_PLAYLIST_SUBJECT = "/playlist/:id";
export const ROUTE_PLAYLIST_SUBJECT_TOPIC = "/playlist/:id/videoPage";
export const ROUTE_PLAYLIST_SUBJECT_VIDEOS = "/playlist/:id/otherVideos";

export const ROUTE_GROUPS = "/communities";

export const ROUTE_COURSES = "/courses";

export const ROUTE_FOCUS_TIMER = "/focus-timer";

export const ROUTE_SHORTS = "/edu-shorts";

export const ROUTE_ANY = "*";

export const APP_ROUTES = [
    {
        id: -1,
        path: ROUTE_DEFAULT,
        element: DefaultPage
    },
    {
        id: 0,
        path: ROUTE_SIGNUP,
        element: SignUpPage
    },
    {
        id: 1,
        path: ROUTE_LOGIN,
        element: LoginPage
    },
    {
        id: 2,
        path: ROUTE_USER_PAGE,
        element: UserMainPage
    },
    {
        id: 3,
        path: ROUTE_PLAYLIST,
        element: PlaylistMainPage
    },
    {
        id: 4,
        path: ROUTE_COURSES,
        element: CoursesMainPage
    },
    {
        id: 5,
        path: ROUTE_FOCUS_TIMER,
        element: FocusTimerMainPage
    },
    {
        id: 6,
        path: ROUTE_GROUPS,
        element: GroupsMainPage
    }, 
    {
        id: 7,
        path: ROUTE_SHORTS,
        element: EduShortsMainPage
    },
    {
        id: 8,
        path: ROUTE_PLAYLIST_SUBJECT,
        element: SubjectPage
    },
    {
        id: 9,
        path: ROUTE_PLAYLIST_SUBJECT_TOPIC,
        element: TopicPage
    },
    {
        id: 10,
        path: ROUTE_PLAYLIST_SUBJECT_VIDEOS,
        element: VideoPage
    },
    {
        id: 11,
        path: ROUTE_PUBLIC_USER_PAGE,
        element: OtherUsersPage,
    },
]