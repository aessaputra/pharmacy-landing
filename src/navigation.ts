const mainLinks = [
  { text: 'Beranda', href: '/#beranda' },
  { text: 'Kategori', href: '/#kategori' },
  { text: 'Tentang', href: '/#tentang' },
  { text: 'Download', href: '/#download' },
];

export const headerData = {
  links: mainLinks,
  actions: [{ text: 'Download aplikasi', href: '/#download' }],
};

export const footerData = {
  links: [
    {
      title: 'Navigasi',
      links: mainLinks,
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: 'Profil singkat Sinar Farma. Detail kontak resmi akan disampaikan melalui kanal resmi.',
};
