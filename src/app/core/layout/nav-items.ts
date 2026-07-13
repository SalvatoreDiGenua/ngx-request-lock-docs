export interface NavItem {
  /** Transloco key. */
  readonly labelKey: string;
  readonly route: string;
}

export interface NavGroup {
  /** Transloco key. */
  readonly labelKey: string;
  readonly items: readonly NavItem[];
}

export const NAV_GROUPS: readonly NavGroup[] = [
  {
    labelKey: 'nav.sectionGuide',
    items: [
      { labelKey: 'nav.home', route: '/' },
      { labelKey: 'nav.problem', route: '/problem' },
      { labelKey: 'nav.architecture', route: '/architecture' },
      { labelKey: 'nav.installation', route: '/installation' },
    ],
  },
  {
    labelKey: 'nav.sectionUsage',
    items: [
      { labelKey: 'nav.directiveUsage', route: '/directive-usage' },
      { labelKey: 'nav.flowLock', route: '/flow-lock' },
    ],
  },
];
