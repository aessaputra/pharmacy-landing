const mainLinks = [
  { text: 'Beranda', href: '/#beranda' },
  { text: 'Fitur', href: '/#fitur' },
  { text: 'Tentang', href: '/#tentang' },
];

export const headerData = {
  links: mainLinks,
  actions: [{ text: 'Unduh Aplikasi', href: 'https://drive.google.com/drive/folders/1_RH4ZZTydq_RQmvIl7ywUh0X1rWYDnJt?usp=drive_link', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Menu',
      links: mainLinks,
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: '',
};
