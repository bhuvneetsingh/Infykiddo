/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
export interface ICourse {
  trainerId: number;
  courseId: number;
  cname: string;
  minAge: number;
  maxAge: number;
  cdur: number;
  preReq: string;
  cdesc: string;
  approval: boolean;
}
