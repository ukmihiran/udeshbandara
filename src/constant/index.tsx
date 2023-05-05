import {
    SiApple,
    SiFirebase,
    SiFastlane,
    SiGmail,
    SiTypescript,
    SiTailwindcss,
    SiAntdesign,
    SiRedux,
    SiCplusplus,
    SiMicrosoftazure,
  } from "react-icons/si";
  import {
    FaReact,
    FaJs,
    FaGitAlt,
    FaAndroid,
    FaLinkedin,
    FaStackOverflow,
    FaGithub,
    FaSass,
    FaPython,
    FaPhp,
    FaNodeJs,
    FaAws,
  } from "react-icons/fa";
  import { CgAlbum } from "react-icons/cg";
  import { TbBrandNextjs } from "react-icons/tb";

import burp from "public/burp.png";

  const menuLinks = [
    { name: "About Me", route: "/about" },
    { name: "Github", route: "/github" },
    // { name: "Articles", route: "/article" },
    { name: "Contact", route: "/contact" },
    { name: "Blog", route: "https://cybernetgen.com" },
  ];
  
  const siteConfig = {
    copyright: `Copyright © ${new Date().getFullYear()} Udesh Bandara. All Rights Reserved.`,
    author: {
      name: "Udesh Bandara",
      accounts: [
        {
          url: "https://github.com/ukmihiran",
          icon: <FaGithub />,
          name: "Github",
          type: "gray",
        },
        {
          url: "https://www.linkedin.com/in/udesh-bandara/",
          icon: <FaLinkedin />,
          name: "Linkedin",
          type: "linkedin",
        },
        {
          url: "https://stackoverflow.com/users/16128933/mihiran",
          icon: <FaStackOverflow />,
          name: "StackOverflow",
          type: "orange",
        },
        {
          url: "mailto:ukmihiran@gmail.com",
          icon: <SiGmail />,
          name: "Gmail",
          type: "red",
        },
      ],
    },
  };
  
  const resume = {
    url: "https://drive.google.com/file/d/1w8QltCuHptkU6HPo8VgZ7-dGhBxHFtCc/view?usp=sharing",
    icon: <CgAlbum />,
    name: "Resume",
  };
  
  const mobileTechStacks = [
    {
      name: "Android",
      icon: <FaAndroid fontSize="20px" />,
      url: "https://www.android.com/",
    },
    {
      name: "iOS",
      icon: <SiApple fontSize="20px" />,
      url: "https://developer.apple.com/",
    },
  ];
  
  const webTechStacks = [
    {
      name: "Python",
      icon: <FaPython fontSize="20px" />,
      url: "https://reactnative.dev/",
    },
    {
      name: "NextJS",
      icon: <TbBrandNextjs fontSize="20px" />,
      url: "https://nextjs.org/",
    },
    {
      name: "C++",
      icon: <SiCplusplus fontSize="20px" />,
      url: "https://en.wikipedia.org/wiki/C++",
    },
    {
      name: "PHP",
      icon: <FaPhp fontSize="20px" />,
      url: "https://www.php.net",
    },
    {
      name: "NodeJS",
      icon: <FaNodeJs fontSize="20px" />,
      url: "https://nodejs.org",
    },
    {
      name: "AWS",
      icon: <FaAws fontSize="20px" />,
      url: "https://aws.amazon.com/",
    },
    {
      name: "Azure",
      icon: <SiMicrosoftazure fontSize="20px" />,
      url: "https://portal.azure.com",
    },
    {
      name: "Github & GitLab",
      icon: <FaGitAlt fontSize="20px" />,
      url: "https://www.gitlab.com/",
    },
  ];
  
  const otherTechStacks = [
    {
      name: "Burp Suite",
      // icon: <SiFastlane fontSize="20px" />,
      icon: <img src="/burp.png" alt="burp" width="60px" />,
      url: "https://burpsuite.com/",
    },
    {
      name: "Nessus",
      icon: <img src="/nessus.png" alt="burp" width="60px" />,
      url: "https://www.tenable.com/products/nessus",
    },
    {
      name: "Metasploit",
      icon: <img src="/Metasploit.png" alt="burp" width="60px" />,
      url: "https://www.metasploit.com/",
    },
    {
      name: "Nmap",
      icon: <img src="/nmap.png" alt="burp" width="60px" />,
      url: "https://nmap.org/",
    },
    {
      name: "Splunk",
      icon: <img src="/splunk.png" alt="burp" width="60px" />,
      url: "https://www.splunk.com/",
    },
    {
      name: "SQLMap",
      icon: <img src="/Sqlmap.png" alt="burp" width="60px" />,
      url: "https://sqlmap.org/",
    },
    {
      name: "Kali Linux",
      icon: <img src="/kali.png" alt="burp" width="60px" />,
      url: "https://www.kali.org/",
    },

  ];
  
  const companies = [
    {
      title: "Axiata Digital Labs",
      alt: "Axiata image",
      url: "https://www.axiatadigitallabs.com/",
      role: "Cybersecurity Engineer",
      skills: ["Pentesting", "Vulnerability Management", "RedTeam", "API Security",],
      period: "April 2021 - Dec 2021",
      logo: "/axiata.png",
    },
    {
      title: "CryptoGen Pvt Ltd",
      alt: "Cryptogen image",
      url: "https://www.crypto-gen.com/",
      role: "Assistant Engineer - Information security",
      skills: [
        "RedTeam",
        "Pentesting",
        "Vulnerability Management",
        "Mobile App Security",
        "Web App Security",
        "Security Automation",
      ],
      period: "April 2020 - April 2021",
      logo: "/cryptogen.jpeg",
    },
    {
      title: "PricewaterhouseCoopers – PwC",
      alt: "PwC image",
      url: "https://www.pwc.com/lk/en.html",
      role: "Cybersecurity Analyst",
      skills: ["IT General Control", "Pentesting", "Vulnerability Management", "VA automation", "AWS"],
      period: "Jan 2019 - April 2020",
      logo: "/pwc.png",
    },
  ];
  
  const educations = [
    {
      title: "Univerity of the West of England",
      alt: "uuwe image",
      url: "https://uwe.ac.uk/",
      role: "Master of Science - Cybersecurity",
      skills: ["Pentesting", "Security Management", "IoT Security", "Cloud Security", "Risk Management"],
      period: "Jan 2022 - Jan 2023",
      logo: "/uwe.png",
    },
    {
      title: "Sri Lanka Institute of Information Technology",
      alt: "sliit image",
      url: "https://www.sliit.lk/",
      role: "Bachelor of Science - Information Technology specialising in Cybersecurity",
      skills: ["Risk management", "Pentesting", "Netwrork Security", "Web Security", "Mobile Security"],
      period: "Jan 2016 - Jun 2020",
      logo: "/sliit.png",
    },
  ];
  
  // const sideProjects = [
  //   {
  //     name: "3CommasClub NFT",
  //     imageUrl: "/3commas.png",
  //     alt: "3commasclub",
  //     summary:
  //       "NFC business card builder linked with unique NFT. Build business profile embed with NFC that allows others to scan and connect.",
  //     link: "https://nextjs-3commasclub-frontend.vercel.app/",
  //     tech: [
  //       'NextJS',
  //       "ChakraUI",
  //       "Ant Design",
  //       "Ant Design Pro"
  //     ]
  //   },
  //   {
  //     name: "KlusterX Player Portal",
  //     imageUrl: "/klusterx_player.png",
  //     alt: "klusterx",
  //     summary: "Online Casino Player Portal, built with NextJS, TailwindCSS and MantineUI",
  //     tech: [
  //       'NextJS',
  //       "TailwindCSS",
  //       "MantineUI",
  //       "Zustand"
  //     ]
  //   },
  //   {
  //     name: "KlusterX Tenant Portal",
  //     imageUrl: "/klusterx_tenant.png",
  //     alt: "klusterx",
  //     summary: "Online Casino Tenant Portal, built with Ant Design Pro",
  //     tech: [
  //       "UmiJS",
  //       "Ant Design",
  //       "Ant Design Pro"
  //     ]
  //   },
  //   {
  //     name: "Chativo",
  //     imageUrl: "https://play-lh.googleusercontent.com/tgLiP-ZL-sBuZt2RzDU1tN88Cp7NPbdjF7c0311_dui86f1HrAQM0j4gXaRE0pb5zW0=s360-rw",
  //     alt: "chativo",
  //     summary: "Enterprise ready live-chat base customer support & engagement software",
  //     tech: [
  //       "Android",
  //       "Kotlin",
  //       "Android Jetpack",
  //       "Coroutine Flow",
  //     ],
  //     link: "https://play.google.com/store/apps/details?id=io.chativo.chat"
  //   },
  //   {
  //     name: "ChativoV",
  //     imageUrl: "https://play-lh.googleusercontent.com/5U5s7sSIuzP6CygPkU2ZYxyOXT-MKv7oiyweGKHgkEgVameOcYt44rnXqCTWZJNZgVqn=s360-rw",
  //     alt: "chativo-v",
  //     summary: "Live-chat specifically designed for visitors to communicate with real-time agent instantly",
  //     tech: [
  //       "React Native",
  //       "Javascript",
  //       "Redux",
  //       "Redux Saga",
  //       "RealmJS"
  //     ],
  //     link: "https://play.google.com/store/apps/details?id=io.chativo.visitor"
  //   },
  // ];
  
  export {
    menuLinks,
    webTechStacks,
    mobileTechStacks,
    otherTechStacks,
    siteConfig,
    resume,
    companies,
    educations,
    // sideProjects,
  };