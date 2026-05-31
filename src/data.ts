import { CareerPath, JobListing, Institution, QuizQuestion } from './types';

// Hotlinked high-fidelity assets from user layout templates
export const IMAGES = {
  heroAtrium: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUfJkZls_NkS6PygV5_sqLCY5vDUQVlPPwRhCyYoyqRt3q76QFd9kTMFlyE0fG-Ww06EFZbdz4FWJWqPg8lYMJj3wPmTD35mEc_wqV__krkWef3GR5IOzh4Dz5jQOm9xxsw2PeL2BnMQo5Jbyy06k6h-T50dk71-Sn4x54S2iZd8EwVzCgRw40x8fJWwzAD8DvZ6GcqwuLBtV9oM0mTcJYZxPACthxVMc6ZnkRQC4k5jN_cRjvvzYAyd2G1bJyv2gfmBbHx0qMH4k",
  user1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDujGauOxfOk433OQeXOQb4VtYAkmzGRqs0H_RgFOV-bqCnekOOp-D1mpmrUb0nZsPRlp6bZpUtl75M-erXsJFbHZ_9qk5HGkf678v_EGjaUO10idzp5ydJlaCGrLURrn7nRDuWaTCIK0YpRqH7hxvkPHOm0LrclwbnYOd4xFuKvsGYfXIG5mIdLflS0dKqA_9p1MDRrB5wMVzK0P1KvwJSVuOduzLPxafHDEBGF0WdinOFQphdaiRX4MMOIBI6HAD-dDdS32j5b9c",
  user2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZKMGB7hr2Uf7hS_FxAdfTBD4oShp3U5IPIir8V7deGXMKhQi44ZChz0lrpe0aOqlQWjQEh1F4Kj9uG7YlCIKn5OsdEP9B9bojw47LtOiYqzkm5lTYJMaVwgU86iKOoJLxBXmu_1jKtUYra2laSpU5vUZX-7d28P4vq8Dmz_sxJkVIFiX5GE5t45pghgx1PakKinuqzLusPwJ27g0g9uukuHi6gPNeoY2riIV5PIPUv-D87s9mrWxIYTRFlOPmHYL8nlf86Y1rGwQ",
  user3: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXfhxjBfcr4b_3LyD6_V85gqnNErmP3b2e7fEZDgLze6FB_ZsG8GKokZ3dSKhuXsXdyyq6_MnP0g6u831-1KwVbJnVJfyUqTVGww5aJLU7dIowgKqH5grZsa2pOnRVXFqIahAXmo-dsHnfPTLy6DNl6fULz2jLcAhlXAGXs9iPS54wLZere54mGMWiv10NLQMnLZbe0PbngOf9SIGK8qFVZqStTlO47zaZZRy70RJjaSHfLn0EZVDa0GGYvE8XdBeMS1QjDUvEZnI",
  aiSuggestionsNet: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYTuP-f9c3q0BWY_FM9czZrwnubNcMHVKa-I0JoMwnKLStgBA9GfpjXCENd6CnwSy-n0cfFJWJ4uPFxnecY6L9IThNGAAkFzlSgoIcTsscjY1zJIdVe5GYkhF-90jXAFnf_GCatQjQ4Y0Ijfoww7xj4I5Ji-NrRgaZPWGfGXbqS8FHg22X_bd4s-AlhDKR1auSINOP_xUyCqArBmufxVweETaBnFJuO1t6luaPW3BVAN8ijj9M-jkRIDGePY_XRch8D8lEATjLpWs",
  officeInterior: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGJduyVisXk1wePj36hDGrLh-1gH4puRrxdPy-UAcSqOTQhHSN1to6Cfae6HdYGQrTlnn40DAhL3hTUMWo6KALHISe8aukSYDgzu_5PsLpKPrq53nCj4dVFU_YhDvSv2jNs3JP6TAqf4Id2wHVSUVbEMQxm4852NM9Vpzqg-GUF3xW4NinW-mbDEH7_JS0Ooe2XutBtNkeKDUWFiJ8SUALry4j_y9KQ1no9cvuFpj2OQqKIGuHQiy16oncDo_-BalA3hQL9RdeGe8",
  laptopDesk: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5jpYRjkadbHrm3XJRCd4eCzJ57pYNfbi0BUQNRgHK0EgbimVTL87S7ILjt7AMDiIRcU8Ektx9c1-qjCNqvQXuYUC4Sw9TNHac0Qkcb96ju7K9swMR5yygoWW5cnqn3Ix4L_snBXzZU1eyluZ5h7xwKCMx_9SdqDRu3GStlBejdIMgELXE5XjxAJkkozCJ95wSaBNTEZxDzqkCtvGNxL3x8dBpRHjGAvSRr63F2yjMWLAf4nG6zF2CwqRMJBlBtf7fTpRr8ikPmqA",
  dataScienceMatrix: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV6B7e5kokPTenqTJ7umiSf4QMVlhjWXlb82tAS93zYIucOsMPZlqAXSfn6Ak8rLSZxrmAPyeJHe9SiJDHHvXYTJ5zVDls9H4hhURzJVLmiGmjdzxEXAqNoEBt098g5h-hNWJa_8pV3Tf6wrove45yDOjvgJo0yvf0I1YAD2A2ZnntpFD6nnbuFto6EfEeBhKXwdrCsUMhfWSwtjiGjwRBKMmQJhR155jZu8kwFAuYKRMym0ryf4d5sUd03uvana-OBwhNDNzVGrw",
  sterileSurgery: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjD8DY0qB8YcrO2922RIJ8ASNKgDpH5c3tOgitK0IwNhAOHzdXNX33ebKUhFz0k0F_zgBgiXchUC2OxdnKOFB-PvYFt-7zeQwAwo3uU24UK8xpeFu5Goh2TOio5dl8nz-tfpxTOOXLM57DTgdPWs83JttZaRApsqm0m1wHRiSsn8SAzCrIoXtFwvRbAS7CT6lJD8bWGn4uvMixrVyEiSnNHsztK494iiCLWCLQJ5khui1Ul3vvJj8P1R0mY8IkqgVTuYi3SSkbiCI",
  lawLibrary: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjl6Pv8n0XHC7IHhi0MFb0ZgAMX9eySce0Y21QO-qZG-LstSXcqqW4GEbb7Q3r3sNWPUPwSUsYJhcPEWStaHQkfwYuykgxwScSdKUwXsn-qGkMnxTpfSZfeeDcIX8zrvcImYebbEoq1kdEWB873lck9hGXXN_AJLCIs0jWfRIXM0Q19J2wI2QGfbx57qGmnDzdfNg3sc3_JGNxnenYDTYcxNkwTR4uvrAl_1VRKr4oiTusfUGY3YesgxyW-WwveFl9BJ-UNXnYd7A",
  stickyNotesWorkshop: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzq4d1Jn84ILkV0dwDsZkLquEAC9Ml5N4MNOJbqcvGLRUP40BejktJoD-16se-1Ee-JqtjhBAfxT2vCJXklXgSmwsHhm5y5Z6YhpeCULiavjwUWRKMYXxSaficXujvQqAKCxlXjGSgnmIuHTajwOUlkSrdxKbIsuHtlskDpOoJp4Oh9SqQaeph70e-pn1p5QNORbJYhAHja1ApPIBrJYedcReoitiBZI6pCzrTh-PIwAGOjj4loyAMjL_xcI2iVvabo7vgoTkIBOg",
  financialAnalysis: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsZWSj-NhDqArGFdmqxSMnWdXc2039VjF8-r7UgBGxoUUkgC9ovGkOcZqwSB-JfRacqWG_nVef9XaBuSBdEuf8nkU8CR-wyDevSXUXHiJ39-pp9VpZJqsHAABDBg1mHZSBy64HrRO3ntCFpjVPyly6-0ufaUe8easVvA2iTBRfSDI3267faF2LmrCnSd_l304Ie99EfY1ODNqx_3uDJTBQujwYEW8yYQEy8ScyUMsQNx5SlRGhB84dstup95_QqP1GASBJIn6XvGI",
  resumeReviewDeck: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpepDSYuV3PJ2gvnyGE9sRbsPoMc-YIcvrzznvtnoc2J0V7O2T8nAeuKkmVtzH0ckfdWbC5ewTi7F1-cvtXXrxSySaxi4ghP8_-NjPZWmr_LlPqh6pvDoSjRxkSz3ZlR0bmytm0MdiGvr5oyrBpFLSE0TPR-qTYo27bXXf9jSKv0t2uLh45Rs-MN3UNXfbQYpCjZJ8T0wzZtPdFSZb4Vcz67FxVBKcAWZB00ZqdRxP8kDbI--ZIWxH6EwRkOGVCwaFMjK_BQ1JwBk",
  apexSystemsLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH2zYVFQtkDeR25MCNEX52hcWu2ZU4P_GvKYCsn5nUKmLJad6igcjxrfXp3SHTYFxZImQ7YRqR5iHhskyeuw_eo9PZQOWis8Gl9nfyo4NrOBH1iDf-SKyOckVRHyecV8M2H8-k0oHkyCKNnOl1ZWPIEmfDE7Zn_r6YfLyH4WTMCoa4kZuYJTVAeWPn-KoHgYRksj0sPgUI0tf-aQL4nW0eFIEaqBDuzHuiRKKWy3OF2LDIwAJjGP_mEVQ7seORnpj2OZ6Q8uONx5M",
  horizonFinanceLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQObfx70NkxsCV94jhqNP2vJcuQH7MUWwRd9a0-eGBdGSbIgHyUAn15j8E937B4wWnusJYog6envd5p6Zzw2lsUcQHNAuTflokulU74BF6gdx7jv_qEz5aMK0orUgBgsk1H9qOUYgHf1ilcaO9KqVXHP1MNzufSb6U6r2HjE9mxEWj3JGRVRLbGiWGFzl5_fqaAMrbGT2cZ0HsfCMo4BO9KPiyjMPY0UNUgjUEjJM_GX8AW2FFxDLKX_OtldO2vV3BDI9u1oieLVk",
  cloudScaleSolutionsLogo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb-H4xbt3DakRC_2eiiK0jjbjHOO2VcbbFvS7C0LeEPd6F16iJYQlmnBRo8fZxi5EbqI3It-Q5zsZs123uOsmN4UoLz_EmluwDCarg_wcGnA7R3afDf8jwd9QPA0Jw4eiwvfGtzS8y6QEUKrHW4FkndPkP3smhDDvgBh_u57zOkERlR0-FBfbCWknVz0eKXrB4gpEdYUrir9t_P0YZRgg9jEybMDVuvlz2xS1hmrJcvMQ52HpgA9IJnKf6vMwWK_tE-JymRByJZCw",
  topographicalMapBg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC0quoAUrUZDTFHCdnCDJLmWQH4E8Sy9Lex_AaCeZVLK2iMxshd5ttKTcy8TNQOW1d85-Vnfppg8rlunmnDQE_kMkz-XsePHpuLW-5Mv94diXTdAYbxIfBUA61cq0bfO1ClKER-Bu4-XRZHg0cflCrXswoLOJR-9N_OOwa5tD0_4cUaxM9ep553tlUVebhe02aYseCrw8gzOioL-qgF53RfSxkj4YdI79LPAcZD8rnbIwbfMXIDa-5BdpSbw5p6AuA0gFWQYyHeSA"
};

export const MOCK_CAREER_PATHS: CareerPath[] = [
  {
    id: 'careers_se',
    title: 'Software Engineer',
    field: 'Tech',
    description: 'Design, develop, and maintain complex software systems and applications using modern programming languages.',
    avgSalary: '$125,000',
    salaryNum: 125000,
    image: IMAGES.laptopDesk,
    education: "Bachelor's Degree",
    matchScore: 94
  },
  {
    id: 'careers_ds',
    title: 'Data Scientist',
    field: 'Tech',
    description: 'Extract meaningful insights from large datasets using statistical analysis and machine learning algorithms.',
    avgSalary: '$135,000',
    salaryNum: 135000,
    image: IMAGES.dataScienceMatrix,
    education: "Master's Degree",
    matchScore: 89
  },
  {
    id: 'careers_sur',
    title: 'Surgeon',
    field: 'Healthcare',
    description: 'Perform complex medical procedures and operations to treat diseases, injuries, and deformities.',
    avgSalary: '$410,000',
    salaryNum: 410000,
    image: IMAGES.sterileSurgery,
    education: 'Doctorate / Professional',
    matchScore: 78
  },
  {
    id: 'careers_law',
    title: 'Corporate Lawyer',
    field: 'Finance & Law',
    description: 'Advise businesses on legal rights, obligations, and responsibilities in complex commercial transactions.',
    avgSalary: '$165,000',
    salaryNum: 165000,
    image: IMAGES.lawLibrary,
    education: 'Doctorate / Professional',
    matchScore: 82
  },
  {
    id: 'careers_pm',
    title: 'Product Manager',
    field: 'Tech',
    description: 'Lead the cross-functional development of products from initial concept through to market launch.',
    avgSalary: '$140,000',
    salaryNum: 140000,
    image: IMAGES.stickyNotesWorkshop,
    education: "Bachelor's Degree",
    matchScore: 96
  },
  {
    id: 'careers_fa',
    title: 'Financial Analyst',
    field: 'Finance',
    description: 'Analyze financial data to forecast trends and help organizations make informed investment decisions.',
    avgSalary: '$92,000',
    salaryNum: 92000,
    image: IMAGES.financialAnalysis,
    education: "Associate / Certificate",
    matchScore: 91
  }
];

export const MOCK_JOBS: JobListing[] = [
  {
    id: 'job_1',
    title: 'Senior Software Engineer (Full Stack)',
    company: 'Apex Systems',
    location: '100% Remote',
    isRemote: true,
    type: 'Full-time',
    matchScore: 98,
    tags: ['React', 'Node.js', 'AWS', 'TypeScript'],
    salaryMin: 140000,
    salaryMax: 185000,
    salaryStr: '$140k - $185k',
    postedTime: '2 hours ago',
    logoUrl: IMAGES.apexSystemsLogo
  },
  {
    id: 'job_2',
    title: 'Financial Data Analyst',
    company: 'Horizon Finance',
    location: 'New York, NY (Hybrid)',
    isRemote: false,
    type: 'Full-time',
    matchScore: 92,
    tags: ['Python', 'SQL', 'Excel', 'Tableau'],
    salaryMin: 95000,
    salaryMax: 120000,
    salaryStr: '$95k - $120k',
    postedTime: '5 hours ago',
    logoUrl: IMAGES.horizonFinanceLogo
  },
  {
    id: 'job_3',
    title: 'Product Designer (UX/UI)',
    company: 'CloudScale Solutions',
    location: 'London, UK (Remote Eligible)',
    isRemote: true,
    type: 'Remote',
    matchScore: 85,
    tags: ['Figma', 'Design Systems', 'Prototyping'],
    salaryMin: 90000,
    salaryMax: 110000,
    salaryStr: '£70k - £90k',
    postedTime: '1 day ago',
    logoUrl: IMAGES.cloudScaleSolutionsLogo
  }
];

export const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: 'inst_1',
    name: 'Stanford Graduate School',
    location: 'Palo Alto, CA',
    rating: 4.9,
    tuition: 42000,
    tuitionStr: '$42k/Year',
    tags: ['Tech', 'Business'],
    matchScore: 98,
    image: IMAGES.heroAtrium,
    coords: { x: 38, y: 28 },
    iconType: 'school'
  },
  {
    id: 'inst_2',
    name: 'MIT Professional Learning',
    location: 'Cambridge, MA',
    rating: 4.8,
    tuition: 38000,
    tuitionStr: '$38k/Year',
    tags: ['Engineering', 'Research'],
    matchScore: 91,
    image: IMAGES.stickyNotesWorkshop,
    coords: { x: 55, y: 44 },
    iconType: 'account_balance'
  },
  {
    id: 'inst_3',
    name: 'UC Berkeley Institute',
    location: 'Berkeley, CA',
    rating: 4.7,
    tuition: 31000,
    tuitionStr: '$31k/Year',
    tags: ['Innovation', 'Design'],
    matchScore: 89,
    image: IMAGES.laptopDesk,
    coords: { x: 25, y: 19 },
    iconType: 'architecture'
  }
];

export const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionStr: "Which foundational paradigm holds that user interfaces should adapt automatically to container sizes without hardcoding device frame constants?",
    options: [
      { key: 'A', text: 'Responsive Container Query Grid adaptation.' },
      { key: 'B', text: 'Stretching frame bounds inside window resize handlers.' },
      { key: 'C', text: 'Fixed viewport calculations like window.innerWidth minus 200px.' },
      { key: 'D', text: 'Absolute coordinate anchors.' }
    ],
    correctAnswer: 'A'
  },
  {
    id: 2,
    questionStr: "When designing data visualizations, what is the primary standard regarding high-frequency dashboard micro-interactions?",
    options: [
      { key: 'A', text: 'Trigger extensive physical triggers on page reload.' },
      { key: 'B', text: 'Deliver light tooltips and gentle highlight styling using low-stress color scales.' },
      { key: 'C', text: 'Add intense repeating blinking warning indicators.' },
      { key: 'D', text: 'Disable styling transitions to save framework thread overhead.' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 3,
    questionStr: "To establish a pristine 'Swiss/Modern' typography aesthetic, which of the following element pairings is most correct?",
    options: [
      { key: 'A', text: 'Using highly decorative cursive display fonts coupled with un-kerned Serif text.' },
      { key: 'B', text: 'Tight, confident geometric sans-serif headings with high-legibility body copy for deep-scan tasks.' },
      { key: 'C', text: 'Using extreme bright yellow comic text blocks.' },
      { key: 'D', text: 'Keeping identical margins and font-sizes for both system telemetry and core text elements.' }
    ],
    correctAnswer: 'B'
  },
  {
    id: 12, // Prepopulated matching screen Question 12
    questionStr: "When designing for high-trust academic platforms, which of the following visual strategies most effectively reduces cognitive load for complex decision-making processes?",
    options: [
      { key: 'A', text: "Utilizing vibrant, high-contrast decorative flourishes to maintain user engagement." },
      { key: 'B', text: "Employing expansive whitespace and a structured information hierarchy." },
      { key: 'C', text: "Minimizing vertical scanning by compressing all content into a single dense view." },
      { key: 'D', text: "Relying on complex animations to guide the eye through multi-step forms." }
    ],
    correctAnswer: 'B'
  }
];

// Generates dummy questions up to 30 to make navigation perfectly functional
export const getAllMockQuestions = (): QuizQuestion[] => {
  const list = [...MOCK_QUESTIONS];
  for (let i = 1; i <= 30; i++) {
    if (!list.some(q => q.id === i)) {
      list.push({
        id: i,
        questionStr: `General assessment query #${i}: How do we maintain structured architectural patterns under professional workloads?`,
        options: [
          { key: 'A', text: `Option A for query test #${i} - Choose default scaffolding.` },
          { key: 'B', text: `Option B for query test #${i} - Emphasize continuous high-trust layout integration.` },
          { key: 'C', text: `Option C for query test #${i} - Bypass design systems to accelerate code delivery.` },
          { key: 'D', text: `Option D for query test #${i} - Rely entirely on external API endpoints.` }
        ],
        correctAnswer: 'B'
      });
    }
  }
  return list.sort((a,b) => a.id - b.id);
};
