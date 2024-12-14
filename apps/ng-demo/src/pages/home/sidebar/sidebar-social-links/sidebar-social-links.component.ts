import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar-social-links',
  templateUrl: './sidebar-social-links.component.html',
  styles: [
    `
      :host {
        padding: 1rem;
        margin-top: 1rem;
        display: block;
      }

      ul {
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .icon {
        margin: 0 0.5rem;
        width: 24px;
        height: auto;
      }
    `,
  ],
  imports: [],
})
export class SidebarSocialLinksComponent {
  readonly socials = [
    {
      href: 'https://github.com/code-pushup/cli',
      label: 'GitHub',
      imgSrc: 'assets/github.svg',
      imgHeight: '96',
      imgWidth: '98',
    },
    {
      href: 'https://www.linkedin.com/company/code-pushup',
      label: 'LinkedIn',
      imgSrc: 'assets/linkedin.svg',
      imgHeight: '16',
      imgWidth: '16',
    },
    {
      href: 'https://x.com/CodePushUp',
      label: 'platform X',
      imgSrc: 'assets/x-twitter.svg',
      imgHeight: '150',
      imgWidth: '166',
    },
  ];
}
