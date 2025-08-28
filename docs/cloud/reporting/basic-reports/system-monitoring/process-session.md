---
sidebar_position: 1
---

# Process Session


Use this report to monitor license usage at the process level. It shows session durations, idle times, and user activity across hosts and applications. This helps you identify resource utilization, idle license consumption, and patterns that support optimization efforts.

## Visualizations

**Total session duration by host name**  
This bar chart shows the total accumulated session duration (in days) for each host. Use it to identify machines with long-running processes.

**Values displayed:**
- **Host name**
- **Session duration (days)**

**Total idle time and session duration by process name**  
This dual-axis chart combines bars (session duration) and a line (idle time) to show how long each process runs and how much of that time is idle. Use it to evaluate application efficiency.

**Values displayed:**
- **Process name**
- **Session duration (days)**
- **Idle time (days)**

**Total idle time and session duration by user name**  
This area and line chart compares session durations and idle times for individual users. Use it to detect idle usage patterns.

**Values displayed:**
- **User name**
- **Session duration (days)**
- **Idle time (days)**

**Process session details table**  
This table lists session metadata for each monitored process. It includes information such as application version, DLL, agent status, and session timing.

**Values displayed:**
- **Process name**: Name of the running application  
- **DLL name**: The DLL file used by the process  
- **Version**: The software version of the process  
- **Agent status**: Indicates whether the monitoring agent is online or offline  
- **Session start time**: When the session began  
- **Session end time**: When the session ended  
- **Session duration (minutes)**: Total session length  
- **Total idle (minutes)**: Total idle time during the session  
- **Shutdown reason**: Why the session ended  
- **User name**  
- **Host name**

## Filters

Use filters to narrow the report data:

- **Process start time**: Filter sessions by a date range 
- **Process name**: Focus on specific applications  
- **DLL name**: Filter by associated DLL file  
- **Host name**: Select specific machines  
- **User name**: Filter by user  

### User tips

- Use the **process name** filter to isolate usage of specific applications.
- Combine filters (e.g., by user and host) to pinpoint inefficient usage patterns.
- Use the session details table to investigate unexpected shutdowns or long idle periods.
- Set up automated alerts if idle time exceeds a certain threshold.

### Notes on interpreting high idle times

High idle time can indicate inefficient license usage or resource waste. Consider these scenarios:

- **Forgotten sessions**: Users may have left applications open unintentionally.  
- **Background processes**: Applications might be running without active user interaction.  
- **Poor license recovery settings**: License timeouts may be too long, causing extended idle durations.

**What you can do:**

- Review idle patterns across users or hosts to find common issues.  
- Adjust license timeout policies to reclaim unused licenses sooner.  
- Provide guidance to users on closing sessions when not in use. 