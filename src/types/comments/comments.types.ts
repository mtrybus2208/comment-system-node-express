import { Document, Model } from 'mongoose';

export interface Comment {
  createdAt: Date;
  name: string;
  slug?: string;
  copy: string;
}

export interface EnterComment extends Comment {
  createdBy: string;
}

export type CommentModel = EnterComment & Document;

export type CommentSchema = Model<CommentModel> & {
  getFilteredComments: (arg1, arg2) => void;
};
