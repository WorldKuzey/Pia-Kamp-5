const confessionsExample = [
    {
      id: "1",
      author: "BlueBear",
      text: "I once deployed to production on a Friday... and it worked!",
      createdAt: "2025-07-01T10:00:00Z",
    },
    {
      id: "2",
      author: "DevNinja",
      text: "I don’t actually know how Redux works, I just copy-paste examples.",
      createdAt: "2025-07-01T11:15:00Z",
    },
    {
      id: "3",
      author: "CodeGhost",
      text: "I’ve been charging my laptop with my colleague’s charger for 2 months.",
      createdAt: "2025-07-01T12:00:00Z",
    },
    {
      id: "4",
      author: "LateNightCoder",
      text: "Sometimes I pretend to be fixing bugs just to avoid meetings.",
      createdAt: "2025-07-01T13:00:00Z",
    },
    {
      id: "5",
      author: "SecretIntern",
      text: "I accidentally pushed an empty commit and blamed GitHub.",
      createdAt: "2025-07-01T14:00:00Z",
    },
    {
      id: "6",
      author: "BugMagnet",
      text: "I once named a variable `data1_final_final_new_test_REAL`.",
      createdAt: "2025-07-01T15:00:00Z",
    },
    {
      id: "7",
      author: "TabOverlord",
      text: "I secretly use spaces in a team of tab fanatics.",
      createdAt: "2025-07-01T15:15:00Z",
    },
    {
      id: "8",
      author: "NightOwl",
      text: "I push commits at 2am so it looks like I’m working hard.",
      createdAt: "2025-07-01T16:00:00Z",
    },
    {
      id: "9",
      author: "CSSWizard",
      text: "I copy all my flexbox code from StackOverflow.",
      createdAt: "2025-07-01T16:30:00Z",
    },
    {
      id: "10",
      author: "SilentWatcher",
      text: "I’ve been in 10 meetings this week and said nothing.",
      createdAt: "2025-07-01T17:00:00Z",
    },
  
    // 20 tane daha
    ...Array.from({ length: 20 }, (_, i) => ({
      id: (11 + i).toString(),
      author: `User${11 + i}`,
      text: `Mock confession number ${11 + i}`,
      createdAt: `2025-07-01T${(18 + i).toString().padStart(2, "0")}:00:00Z`,
    })),
  ];
  
  export default confessionsExample;
  