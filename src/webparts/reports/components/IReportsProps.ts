import { SPHttpClient } from '@microsoft/sp-http'; 

export interface IReportsProps {
  description: string;
  siteurl:string;
  spHttpClient:SPHttpClient;
}
