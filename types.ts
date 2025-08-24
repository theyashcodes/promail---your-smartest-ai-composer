export interface EmailCampaign {
  segment: string;
  subjectA: string;
  subjectB:string;
  body: string; // This will be HTML content
  discountCode: string;
  suggestedKPIs: string;
  headerImage?: string;
}