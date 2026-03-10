export interface Program {
    id: string;
    name: string;
    university: string;
    country: string;
    city: string;
    region: 'Europe' | 'UK' | 'Australia';
    flag: string;
    tuitionCAD: number;
    tuitionLocal: string;
    currency: string;
    deadline: string;
    deadlineISO: string;
    minGPA: number;
    duration: string;
    language: string;
    ranking?: number;
    description: string;
    highlights: string[];
    acceptedDegrees: string[];
    workExperienceRequired: boolean;
    matchFactors: {
        degreeRelevance: number;    // 0-100
        gpaFlexibility: number;     // 0-100
        institutionPrestige: number; // 0-100
        valueForMoney: number;       // 0-100
        careerOutcomes: number;      // 0-100
    };
    applyUrl: string;
    imageGradient: string;
}

export const programs: Program[] = [
    {
        id: 'escp-mim',
        name: 'Master in Management (MiM)',
        university: 'ESCP Business School',
        country: 'France / Germany / Spain',
        city: 'Paris',
        region: 'Europe',
        flag: '🇫🇷',
        tuitionCAD: 62000,
        tuitionLocal: '€42,000',
        currency: 'EUR',
        deadline: 'March 31, 2026',
        deadlineISO: '2026-03-31',
        minGPA: 3.2,
        duration: '2 years',
        language: 'English / French',
        ranking: 4,
        description: 'One of Europe\'s top-ranked business schools with 5 campuses across Europe. The MiM is designed for bachelor graduates and builds global management capabilities.',
        highlights: ['Triple-accredited (AACSB, EQUIS, AMBA)', 'Study on 3 different European campuses', 'Strong alumni network (75,000+)', 'No GMAT required'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Commerce', 'Bachelor of Business Administration'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 95,
            gpaFlexibility: 75,
            institutionPrestige: 90,
            valueForMoney: 60,
            careerOutcomes: 92,
        },
        applyUrl: 'https://escp.eu/programmes/master-in-management',
        imageGradient: 'from-blue-600 to-indigo-800',
    },
    {
        id: 'nova-sbe-mim',
        name: 'MSc in Management',
        university: 'Nova School of Business & Economics',
        country: 'Portugal',
        city: 'Lisbon',
        region: 'Europe',
        flag: '🇵🇹',
        tuitionCAD: 19500,
        tuitionLocal: '€13,249',
        currency: 'EUR',
        deadline: 'February 28, 2026',
        deadlineISO: '2026-02-28',
        minGPA: 3.0,
        duration: '2 years',
        language: 'English',
        ranking: 35,
        description: 'Portugal\'s #1 business school, offering a world-class management education at an exceptional value. Lisbon is one of Europe\'s most affordable and vibrant cities.',
        highlights: ['FT Top 35 Masters in Management worldwide', 'Affordable tuition & cost of living', 'Strong consulting & finance recruitment', '92% employment within 3 months'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Commerce', 'Bachelor of Economics', 'Any bachelor\'s degree'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 90,
            gpaFlexibility: 80,
            institutionPrestige: 78,
            valueForMoney: 95,
            careerOutcomes: 85,
        },
        applyUrl: 'https://www.novasbe.unl.pt/en/programmes/masters/msc-in-management',
        imageGradient: 'from-emerald-500 to-teal-700',
    },
    {
        id: 'tum-management',
        name: 'MSc Management & Technology',
        university: 'Technical University of Munich (TUM)',
        country: 'Germany',
        city: 'Munich',
        region: 'Europe',
        flag: '🇩🇪',
        tuitionCAD: 9000,
        tuitionLocal: '€3,000/semester',
        currency: 'EUR',
        deadline: 'January 15, 2026',
        deadlineISO: '2026-01-15',
        minGPA: 3.3,
        duration: '2 years',
        language: 'English',
        ranking: 42,
        description: 'Germany\'s top technical university offering a unique blend of management and technology. Exceptional value with low tuition and a thriving startup ecosystem in Munich.',
        highlights: ['QS World Rank Top 50 globally', 'Low tuition (€3,000/semester)', 'Access to BMW, Siemens, MAN talent pipeline', 'Strong engineering-business intersection'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Business Administration', 'Bachelor of Engineering with Business minor'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 82,
            gpaFlexibility: 65,
            institutionPrestige: 88,
            valueForMoney: 98,
            careerOutcomes: 87,
        },
        applyUrl: 'https://www.tum.de/en/studies/degree-programs/detail/management-and-technology-master-of-science-msc',
        imageGradient: 'from-sky-500 to-blue-700',
    },
    {
        id: 'warwick-msc-management',
        name: 'MSc Management',
        university: 'Warwick Business School',
        country: 'United Kingdom',
        city: 'Coventry',
        region: 'UK',
        flag: '🇬🇧',
        tuitionCAD: 72000,
        tuitionLocal: '£38,570',
        currency: 'GBP',
        deadline: 'April 30, 2026',
        deadlineISO: '2026-04-30',
        minGPA: 3.3,
        duration: '1 year',
        language: 'English',
        ranking: 22,
        description: 'One of the UK\'s most prestigious business schools. The 1-year MSc Management is ideal for graduates without prior business experience looking to enter top consulting and finance firms.',
        highlights: ['Part of Russell Group (University of Warwick)', '1-year accelerated format', 'Top graduate employer recruitment on campus', 'Strong consulting career outcomes'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Commerce', 'Any strong bachelor\'s degree'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 88,
            gpaFlexibility: 70,
            institutionPrestige: 92,
            valueForMoney: 55,
            careerOutcomes: 93,
        },
        applyUrl: 'https://www.wbs.ac.uk/courses/postgraduate/management/',
        imageGradient: 'from-purple-600 to-violet-800',
    },
    {
        id: 'ucl-msc-management',
        name: 'MSc Management',
        university: 'University College London (UCL)',
        country: 'United Kingdom',
        city: 'London',
        region: 'UK',
        flag: '🇬🇧',
        tuitionCAD: 79000,
        tuitionLocal: '£42,700',
        currency: 'GBP',
        deadline: 'March 31, 2026',
        deadlineISO: '2026-03-31',
        minGPA: 3.5,
        duration: '1 year',
        language: 'English',
        ranking: 9,
        description: 'London\'s global university offering an elite 1-year MSc in the heart of one of the world\'s greatest business cities. Access to unparalleled internship and networking opportunities.',
        highlights: ['Top 10 Globally Ranked University', 'London location = unmatched internships', 'Diverse cohort (100+ nationalities)', 'Strong finance & tech sector placement'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Commerce', 'Any bachelor\'s degree (min 2:1 equiv)'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 85,
            gpaFlexibility: 55,
            institutionPrestige: 98,
            valueForMoney: 48,
            careerOutcomes: 96,
        },
        applyUrl: 'https://www.ucl.ac.uk/management/study/masters-programmes/msc-management',
        imageGradient: 'from-rose-500 to-red-700',
    },
    {
        id: 'manchester-msc-management',
        name: 'MSc International Business & Management',
        university: 'University of Manchester',
        country: 'United Kingdom',
        city: 'Manchester',
        region: 'UK',
        flag: '🇬🇧',
        tuitionCAD: 46000,
        tuitionLocal: '£24,500',
        currency: 'GBP',
        deadline: 'June 30, 2026',
        deadlineISO: '2026-06-30',
        minGPA: 3.0,
        duration: '1 year',
        language: 'English',
        ranking: 31,
        description: 'Alliance Manchester Business School offers a globally-oriented management program with flexibility for international students. Strong MBA pathways available.',
        highlights: ['Triple accredited (AACSB, EQUIS, AMBA)', 'Large Canadian alumni community', 'Flexible intake (September)', 'Strong SME & entrepreneurship ecosystem'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Commerce', 'Bachelor of Arts (Business)', 'Any bachelor\'s degree'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 92,
            gpaFlexibility: 82,
            institutionPrestige: 85,
            valueForMoney: 72,
            careerOutcomes: 84,
        },
        applyUrl: 'https://www.manchester.ac.uk/study/masters/courses/list/01013/msc-international-business-and-management/',
        imageGradient: 'from-amber-500 to-orange-700',
    },
    {
        id: 'umelbourne-master-management',
        name: 'Master of Management',
        university: 'University of Melbourne',
        country: 'Australia',
        city: 'Melbourne',
        region: 'Australia',
        flag: '🇦🇺',
        tuitionCAD: 55000,
        tuitionLocal: 'AUD $55,000',
        currency: 'AUD',
        deadline: 'October 31, 2025',
        deadlineISO: '2025-10-31',
        minGPA: 2.7,
        duration: '1.5–2 years',
        language: 'English',
        ranking: 14,
        description: 'Australia\'s #1 ranked university offering a flexible Master of Management that accepts graduates from ANY undergraduate discipline — perfect for Bachelor of Management holders.',
        highlights: ['Accepts any bachelor\'s degree', 'QS World Top 15', 'Melbourne = #1 Most Livable City', 'Flexible 1.5 or 2-year track'],
        acceptedDegrees: ['Bachelor of Management', 'Any bachelor\'s degree from a recognized institution'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 95,
            gpaFlexibility: 88,
            institutionPrestige: 94,
            valueForMoney: 65,
            careerOutcomes: 90,
        },
        applyUrl: 'https://study.unimelb.edu.au/find/courses/graduate/master-of-management/',
        imageGradient: 'from-cyan-500 to-blue-700',
    },
    {
        id: 'anu-international-management',
        name: 'Master of International Management',
        university: 'Australian National University (ANU)',
        country: 'Australia',
        city: 'Canberra',
        region: 'Australia',
        flag: '🇦🇺',
        tuitionCAD: 57000,
        tuitionLocal: 'AUD $57,600',
        currency: 'AUD',
        deadline: 'November 30, 2025',
        deadlineISO: '2025-11-30',
        minGPA: 3.0,
        duration: '2 years',
        language: 'English',
        ranking: 30,
        description: 'Australia\'s national university offers a globally-focused International Management degree with strong Asia-Pacific ties. Known for government, policy, and international relations alumni.',
        highlights: ['QS World Rank Top 30', 'Strong Asia-Pacific specialization', 'Government & policy career pathways', 'Beautiful campus in the capital city'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Commerce', 'Bachelor of International Business'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 88,
            gpaFlexibility: 80,
            institutionPrestige: 88,
            valueForMoney: 62,
            careerOutcomes: 82,
        },
        applyUrl: 'https://programsandcourses.anu.edu.au/program/MIMGT',
        imageGradient: 'from-green-500 to-emerald-700',
    },
    {
        id: 'deakin-mba-international',
        name: 'Master of Business Administration (International)',
        university: 'Deakin University',
        country: 'Australia',
        city: 'Melbourne',
        region: 'Australia',
        flag: '🇦🇺',
        tuitionCAD: 47000,
        tuitionLocal: 'AUD $47,200',
        currency: 'AUD',
        deadline: 'Rolling — apply by Dec 1, 2025',
        deadlineISO: '2025-12-01',
        minGPA: 2.5,
        duration: '2 years',
        language: 'English',
        ranking: 300,
        description: 'A highly accessible MBA program for recent graduates from management backgrounds. Deakin accepts a 65% weighted average from a related bachelor\'s — one of the lowest GPA thresholds in Australia.',
        highlights: ['Lowest GPA threshold (2.5/4.0)', 'Rolling admissions - flexible start dates', 'Strong online/hybrid options', 'AACSB accredited'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Commerce', 'Bachelor of Business Administration'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 90,
            gpaFlexibility: 95,
            institutionPrestige: 65,
            valueForMoney: 78,
            careerOutcomes: 72,
        },
        applyUrl: 'https://www.deakin.edu.au/course/master-business-administration-international',
        imageGradient: 'from-violet-500 to-purple-700',
    },
    {
        id: 'euba-international-business',
        name: 'MSc International Business Management',
        university: 'University of Economics in Bratislava (EUBA)',
        country: 'Slovakia',
        city: 'Bratislava',
        region: 'Europe',
        flag: '🇸🇰',
        tuitionCAD: 4200,
        tuitionLocal: '€2,800/year',
        currency: 'EUR',
        deadline: 'May 31, 2026',
        deadlineISO: '2026-05-31',
        minGPA: 2.5,
        duration: '2 years',
        language: 'English',
        description: 'An affordable EU-accredited program in Central Europe\'s fastest-growing capital. Ideal for budget-conscious students seeking European experience. Fully taught in English.',
        highlights: ['Lowest tuition on the list (~CAD $4,200/yr)', 'EU degree recognized across Europe', 'Bratislava: Central European hub', 'Open admission for strong applicants'],
        acceptedDegrees: ['Bachelor of Management', 'Bachelor of Economics', 'Bachelor of Commerce', 'Any management-related degree'],
        workExperienceRequired: false,
        matchFactors: {
            degreeRelevance: 88,
            gpaFlexibility: 95,
            institutionPrestige: 55,
            valueForMoney: 99,
            careerOutcomes: 62,
        },
        applyUrl: 'https://euba.sk/en',
        imageGradient: 'from-orange-400 to-red-600',
    },
];

export const undergraduateSchools = [
    {
        id: 'ubco',
        name: 'UBC Okanagan (UBCO)',
        degrees: [
            'Bachelor of Management',
            'Bachelor of Arts (Economics)',
            'Bachelor of Science',
        ],
        gpaScale: 4.0,
        location: 'Kelowna, BC, Canada',
        recognized: true,
    },
    {
        id: 'sfu',
        name: 'Simon Fraser University (SFU)',
        degrees: ['Bachelor of Business Administration', 'Bachelor of Arts'],
        gpaScale: 4.33,
        location: 'Burnaby, BC, Canada',
        recognized: true,
    },
    {
        id: 'uvic',
        name: 'University of Victoria (UVic)',
        degrees: ['Bachelor of Commerce', 'Bachelor of Science'],
        gpaScale: 9.0,
        location: 'Victoria, BC, Canada',
        recognized: true,
    },
];

export function calculateMatchScore(program: Program, userGPA: number, userDegree: string): number {
    const { matchFactors, minGPA } = program;

    // GPA factor (0-100 based on how far above minimum the user is)
    const gpaBuffer = userGPA - minGPA;
    const gpaScore = gpaBuffer >= 0.7
        ? 100
        : gpaBuffer >= 0.3
            ? 85
            : gpaBuffer >= 0
                ? 70
                : gpaBuffer >= -0.3
                    ? 45
                    : 20;

    // Degree relevance check
    const degreeMatch = program.acceptedDegrees.some(d =>
        d.toLowerCase().includes(userDegree.toLowerCase()) ||
        userDegree.toLowerCase().includes(d.toLowerCase().split(' ').slice(-1)[0]) ||
        d.toLowerCase().includes('any')
    ) ? 1 : 0.6;

    // Weighted composite
    const composite = (
        matchFactors.degreeRelevance * 0.25 +
        matchFactors.gpaFlexibility * 0.2 +
        matchFactors.institutionPrestige * 0.2 +
        matchFactors.valueForMoney * 0.15 +
        matchFactors.careerOutcomes * 0.2
    );

    const final = (composite * 0.6 + gpaScore * 0.4) * degreeMatch;
    return Math.min(99, Math.round(final));
}
