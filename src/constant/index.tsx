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
    url: "https://drive.google.com/file/d/1aToYMGGG_-yFYY-B_6HVvC1FXXyZiNng/view?usp=sharing",
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