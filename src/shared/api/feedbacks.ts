import axios, { AxiosResponse } from 'axios';
import { Notify } from 'quasar';

export interface ProductDetailsData {
  imtId: number;
  nmId: number;
  productName: string;
  supplierArticle: string;
  supplierName: string;
  brandName: string;
  size: string;
}
export interface Feedback {
  id: string;
  imtId?: number;
  nmId?: number;
  subjectId?: number;
  userName: string;
  text: string;
  productValuation: number;
  createdDate: Date | string;
  updatedDate?: Date;
  answer: unknown;
  state: string;
  productDetails: ProductDetailsData;
  photoLinks: [
    {
      fullSize: string;
      miniSize: string;
    }
  ] | null;
  video: unknown;
  wasViewed: boolean;
}

export interface FeedbacksData {
  data: {
    countUnanswered: number;
    countArchive: number;
    feedbacks: Feedback[];
  };
  error?: false;
  errorText?: string;
  additionalErrors?: unknown;
}
export interface FeedbacksError {
  response: {
    data: { message: string };
    status: number;
  };
}

interface Options {
  token: string;
  isAnswered: boolean;
  feedbackCount: number;
}

export async function getFeedbacks(
  options: Options
): Promise<FeedbacksData | FeedbacksError> {
  try {
    const link = import.meta.env.VITE_FEED;
    const {token, isAnswered, feedbackCount} = options

    const queries = `?skip=0&take=${feedbackCount}&isAnswered=${isAnswered}`;

    const response: AxiosResponse<FeedbacksData> = await axios({
      url: `${link}${queries}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Notify.create({
      message: 'Отзывы загружены',
      icon: 'info',
      position: 'bottom',
      type: 'positive',
    });
    return response.data;
  } catch (error: unknown) {
    const errorObj = error as FeedbacksError;

    Notify.create(errorObj.response.data.message + ' 🙄');
    return errorObj;
  }
}
