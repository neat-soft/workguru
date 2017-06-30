var user = {
    id: "",
    name: "",
    email: "",
    phone_no: "66-81-219-8747",
    age: 30,
    gender: false,
    nationality: "Thai",
    location: "Suanluang, Bangkok",
    type: 0,
    level: true,
    access_token: ""
};

var profile = {
    about: "About You",
    company: 'Asia City Media Group.Co.,Ltd',
    current_work: 'Design Director',
    education: "University of Californa,CA,USA",
    degree: "",
    avatar_url: 0,
    type_of_work: 0,
    field_of_work: {},
    job_title: {},
    salary: {
        from: 58000,
        to: 70000
    },
    job_description: {
        title: "",
        url: ""
    },
    years_of_exp: 14,
    skills: "Marketing, Digital Marketing, Design",
    show_edu: false,
    show_age: false
};

var filter = {
    type_of_work: "Fulltime",
    field_of_work: "Design, Digital Design",
    job_title: "Marketing, Digital Marketing, Design",
    salary: {
        from: 45000,
        to: 65000
    },
    job_description: {
        title: "",
        url: ""
    },
    years_of_exp: 7,
    skills: "",
    age: 0,
    gender: 0,
    nationality: "Thai",
    distance: 80,
    location: "Bangkok, Thailand",

    font_size: 10,
    language: "American English"
};

// const state = {
//     ID: 'user_id',
//     EMAIL: 'email',
//     TYPE: 'type',
//     LEVEL: 'level',
//     //search settings
//     TYPE_WORK: 'type_of_work',
//     FIELD_WORK: 'field_of_work',
//     JOB: 'job_title',
//     SALARY_FROM: 'salary_from',
//     SALARY_TO: 'salary_to',
//     EXPERIENCE: 'experience',
//     SKILLS: 'skills',
//     AGE: 'age',
//     GENDER: 'gender',
//     NATIONALITY: 'nationality',
//     DISTANCE: 'distance',
//     LOCATION: 'location',
//     FONT: 'font',
//     LANGUAGE: 'language'
// };

const url = {
    USER: 'users',
    PROFILE: 'profile',
    CONTACT: 'contacts',
    MESSAGE: 'messages',
    TYPING: 'typing'
};

export default {user, profile, filter, url};