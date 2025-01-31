import { GetFlowResponseInterface } from './getFlowResponse.interface';

export interface FlowStateInterface {
  isLoading: boolean;
  error: string | null;
  data: GetFlowResponseInterface | null;
}
