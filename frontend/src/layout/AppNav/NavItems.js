export const MainNav = [
  {
    icon: 'pe-7s-diamond',
    label: 'Admin Dashboard',
    to: '/dashboard',
  },,
  {
    icon: 'pe-7s-ribbon',
    label: ' Questions Component',
    content: [
      {
          label: 'Categories',
          to: '/category',
      },
      {
        label: 'Questions',
        to: '/question',
    }
  ]
  },
  {
    icon: 'pe-7s-ribbon',
    label: ' Tests',
    to: '/test',
  }, 
  {
    icon: 'pe-7s-graph1',
    label: ' Candidates',
    to: '/user',
      
  }
];
