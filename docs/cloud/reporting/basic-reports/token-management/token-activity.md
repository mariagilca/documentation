---
sidebar_position: 2
---

# Token activity


Use this report to audit token-based license usage at a detailed level. It logs each token transaction, including who used it, when it was used, what feature it applied to, and how many tokens remained. This helps ensure transparent and accountable license tracking.

## Visualizations

**Token activity table**  
This table lists each individual token transaction to provide a granular view of token activity.

**Values displayed:**
- **Vendor**: Provider of the token-based license  
- **Server name**: Server that issued the tokens  
- **Feature name**: Feature or application where tokens were consumed  
- **Product name**: Product associated with the token transaction  
- **User name**: User who consumed or requested tokens  
- **Usage date**: Date of the token event  
- **Tokens consumed**: Number of tokens used in the transaction  
- **Tokens available**: Remaining tokens in the pool at the time of use  

## Filters

Use filters to narrow the report results:

- **Date duration**: Select a range (January 1, 2020 – December 12, 2024) to focus on specific time periods  
- **Feature name**: Filter by software features  
- **User name**: View token activity by individual user  
- **Server name**: Focus on token activity from specific servers  
- **Token type**: Filter by token scheme, if multiple types are in use  



## User tips

- Filter by **user name** to audit token usage for individuals.  
- Use **feature name** to track how token allocation maps to software demand.  
- Combine **server name** and **vendor** to isolate platform-specific consumption patterns.  
- Use **tokens available** to monitor pool depletion and inform license planning.

## Notes on interpreting token activity

- **Frequent low-volume transactions** may indicate interactive or lightweight application use.  
- **High-volume single transactions** could suggest batch processing or heavy feature usage.  
- **Sudden drops in available tokens** may highlight peak usage periods or overconsumption risks.  
- Regularly reviewing token activity supports compliance and license renewal decisions.