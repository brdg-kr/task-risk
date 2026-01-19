# Job Zones

* [Excel](/dictionary/30.1/excel/job_zones.html)
* [Text](/dictionary/30.1/text/job_zones.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/job_zones.html)
* [Oracle](/dictionary/30.1/oracle/job_zones.html)

| **Purpose:** | Provide a mapping of O*NET-SOC occupations to Job Zone ratings. |
| **Table Name:** | job_zones |
| **Download:** | [14_job_zones.sql](/dl_files/database/db_30_1_mysql/14_job_zones.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| job_zone | Decimal(1,0) | Job Zone number *(see [*Job Zone Reference*](job_zone_reference.html "Job Zone Reference"))* |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains each O*NET-SOC code and its corresponding Job Zone number. The file is displayed in four tab delimited fields with the columns named O*NET-SOC Code, Job Zone, Date, and Domain Source. The four fields are represented by one row. There are a total of 923 rows of data in this file.

For more information, see:
* [Procedures for O*NET Job Zone Assignment](https://www.onetcenter.org/reports/JobZoneProcedure.html)
* [Procedures for O*NET Job Zone Assignment: Updated to Include Procedures for Developing Preliminary Job Zones for New O*NET-SOC Occupations](https://www.onetcenter.org/reports/JobZoneProcedureUpdate.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | No structure changes |
| 5.1 | Date and Domain Source columns added |
| 6.0 - 30.1 | No structure changes |

### Data Example - job_zones:

| onetsoc_code | job_zone | date_updated | domain_source |
| --- | --- | --- | --- |
| 17-3026.01 | 4 | 2025-08-01 | Analyst |
| 27-4014.00 | 3 | 2025-08-01 | Analyst |
| 13-1199.04 | 4 | 2025-08-01 | Analyst |
| 49-3011.00 | 3 | 2025-08-01 | Analyst |
| 45-3031.00 | 1 | 2025-08-01 | Analyst |
| 39-6012.00 | 2 | 2025-08-01 | Analyst |