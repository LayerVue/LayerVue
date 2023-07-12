export interface CoreTeam {
  name: string;
  github: string;
  twitter?: string;
  sponsors?: boolean;
  description: string;
  packages?: string[];
  functions?: string[];
}

export const coreTeamMembers: CoreTeam[] = [
  {
    name: 'final summer',
    github: '642661520',
    twitter: 'yjj95',
    description:
      '我是LayerVue的作者<br/>  对于Vue生态系统的热爱和对弹出层组件的热衷驱使着我不断探索和创造。',
  },
];
