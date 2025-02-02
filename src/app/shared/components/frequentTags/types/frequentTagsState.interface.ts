import { PopularTagType } from '../../../types/popularTag.type';

export interface FrequentTagsState {
  isLoading: boolean;
  error: string | null;
  data: PopularTagType[] | null;
}
