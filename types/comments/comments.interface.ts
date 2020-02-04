export interface Comment {
  createdAt: Date;
  name: string;
  slug?: string;
  copy: string;
}

export interface EnterComment extends Comment {
  createdBy: string;
}
