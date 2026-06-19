const mainLinks = [
  { text: 'Beranda', href: '/#beranda' },
  { text: 'Kategori', href: '/#kategori' },
  { text: 'Tentang', href: '/#tentang' },
  { text: 'Kontak', href: '/#kontak' },
];

export const headerData = {
  links: mainLinks,
  actions: [{ text: 'Informasi kontak', href: '/#kontak' }],
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
